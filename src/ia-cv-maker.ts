import { App, Notice, TFile } from "obsidian";
import OpenAI from "openai";
import { IaCvMakerPluginSettings } from "./plugin-settings";

export interface ExperienceEntry {
	started: string;
	ended: string;
	summary: string;
	fileName: string;
	jobtitle: string;
}

export class IaCvMaker {
	settings: IaCvMakerPluginSettings;
	app: App;
	openai: OpenAI;

	constructor(app: App, settings: IaCvMakerPluginSettings) {
		this.settings = settings;
		this.app = app;
		this.openai = new OpenAI({
			apiKey: settings.apiKey,
			dangerouslyAllowBrowser: true,
		});
	}

	async getExpiriencesOrganized(
		experienceFiles: TFile[],
		jobDescription: string
	): Promise<ExperienceEntry[]> {
		console.log("Getting Summaries.");
		const summaries: ExperienceEntry[] = [];
		for (const file of experienceFiles) {
			const content = await this.app.vault.read(file);
			const metadata =
				this.app.metadataCache.getFileCache(file)?.frontmatter;
			if (metadata && metadata.started) {
				summaries.push({
					started: metadata.started,
					ended: metadata.ended,
					summary: content,
					fileName: file.basename,
					jobtitle: metadata["job-title"],
				});
			}
		}
		return summaries.sort((a, b) => b.started.localeCompare(a.started));
	}

	async summarizeExperience(
		summaries: ExperienceEntry[],
		jobDescription: string
	): Promise<string> {
		let content = summaries.reduce((acc, summary) => acc + `## ${summary.jobtitle} | ${summary.fileName} | ${summary.started} - ${summary.ended}\n${summary.summary}\n\n` , "");
		// for (const summary of summaries) {
		// 	content += summary.summary;
		// 	//console.debug(`## ${summary.jobtitle} | ${summary.fileName} | ${summary.started} - ${summary.ended}`);
		// }

		const prompt = `Given the job description:\n\n${jobDescription}\n\n${this.settings.customPrompt}\n\n${content}`;
		console.debug(`prompt: ${prompt}`);
		const completion = await this.openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content: prompt,
				},
			],
			model: "gpt-3.5-turbo",
		});

		if (completion.choices && completion.choices.length > 0) {
			console.debug(`response.data.choices[0].text.trim(): ${completion.choices[0].message}`);
			return completion.choices[0].message.content || "";
		} else {
			return "Error: No response from ChatGPT";
		}
	}

	async saveSummary(summaryContent: string, outputFolder: string) {
		const folder = this.app.vault.getAbstractFileByPath(outputFolder);
		if (!folder) {
			await this.app.vault.createFolder(outputFolder);
		}

		const date = new Date();
		const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, "0")}-${date
			.getDate()
			.toString()
			.padStart(2, "0")}_${date
			.getHours()
			.toString()
			.padStart(2, "0")}-${date
			.getMinutes()
			.toString()
			.padStart(2, "0")}`;
		const outputFileName = `${dateString}-cv.md`;
		const outputPath = `${outputFolder}/${outputFileName}`;

		// const summaryContent = summaries
		// 	.map(
		// 		(entry) =>
		// 			`## ${entry.jobtitle} | ${entry.fileName} | ${
		// 				entry.started
		// 			} - ${entry.ended || "Present"}\n\n${entry.summary}`
		// 	)
		// 	.join("\n\n");

		await this.app.vault.create(outputPath, summaryContent);
		new Notice(`Created new file: ${outputPath}`);
	}
}
