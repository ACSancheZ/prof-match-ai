import { App, Notice, TFile } from "obsidian";
import { ProfMatchIaPluginSettings } from "./plugin-settings";
import ChatGpt from "./chat-gpt";

export interface ExperienceEntry {
	started: string;
	ended: string;
	summary: string;
	fileName: string;
	jobtitle: string;
}

export class ProfMatchIa {
	MAX_CALLS_PER_MINUTE = 3;
	INTERVAL_MS = (60 / this.MAX_CALLS_PER_MINUTE) * 1000; // Interval in milliseconds

	settings: ProfMatchIaPluginSettings;
	app: App;

	constructor(app: App, settings: ProfMatchIaPluginSettings) {
		this.settings = settings;
		this.app = app;
	}

	async getExpiriencesNotesFromFolder(
		experienceFiles: TFile[]
	): Promise<ExperienceEntry[]> {
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
		const queue: string[] = [];
		let chatGpt = new ChatGpt(this.settings);

		new Notice("This process involves accessing the ChatGPT API. Due to API limitations, experience processing will be performed in the background, and it may take several minutes. Your patience is appreciated. You will receive a notification when the process is complete.");

		// Add Job Description in the context
		let jobDescriptionPrompt = this.settings.jobDescriptionPrompt.replace(
			"{{job-description}}",
			jobDescription
		);
		await chatGpt.getCompletion(jobDescriptionPrompt);
		new Notice("Registered job description in the chat GPT context");

		// Add Each Job Experience file to a ChatGPT call. It allows 3 calls per minute, so I have to implement a throttle.
		let summarized = "";
		for (const summary of summaries) {
			setTimeout(() => {}, 20000); // 20 seconds
			let content = `## ${summary.jobtitle} | ${summary.fileName} | ${summary.started} - ${summary.ended}\n${summary.summary}\n\n`;
			let jobExperiencePrompt = this.settings.jobExperiencePrompt.replace(
				"{{job-experience}}",
				content
			);
			await chatGpt.getCompletion(jobExperiencePrompt).then((result) => {
				summarized += result + "\n";
			});
			new Notice(`Get job experience: '${summary.fileName}' summarized.`);
		}

		return summarized;
	}

	async saveSummary(summaryContent: string, outputFolder: string) {
		const folder = this.app.vault.getFolderByPath(outputFolder);
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
		const outputFileName = `Resume-${dateString}.md`;
		const outputPath = `${outputFolder}/${outputFileName}`;

		await this.app.vault.create(outputPath, summaryContent);
		new Notice(`Created new file: ${outputPath}`);
	}
}
