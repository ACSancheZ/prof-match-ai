import ProfMatchIaPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface ProfMatchIaPluginSettings {
	apiKey: string;
	experienceFolder: string;
	jobDescriptionFile: string;
	outputFolder: string;
	customPrompt: string;
}

export const DEFAULT_SETTINGS: ProfMatchIaPluginSettings = {
	apiKey: "",
	experienceFolder: "path/to/your/markdown/folder",
	jobDescriptionFile: "path/to/your/job-description-file.md",
	outputFolder: "path/to/your/output/folder",
	customPrompt: "Each professional experience of the text below starts with \"## job title | Company | Started year-month - Ended year-month then a new line and my professional experience\". I would like to have a output with all my professional experiences given in the format: \"## job title | Company | Started year-month - Ended year-month, then a new line and the summarize of professional experience\", with around 500 character in bullet points. To summary focus on the match of the job requirement with my experiences, than if it's possible mention relevant responsibilities, projects, achievements and tools for the job description. Do not mention periods or dates (but do not remove the dates of the first line, please), job-title or company in the summary, these information are present in the \"title\" of each experience.\nAdditionally, can you please change the year-month of the first line to a year month name, if a date is null, change it to Present:",
		//"Each professional experience start with ## job title | Company | Started year-month - Ended year-month, new line and my professional experience. I would like to have a output with ## job title | Company | Started year-month - Ended year-month, new line and the summarize of professional experience with around 500 character, focusing on relevant projects, responsibilities, achievements, and tools that align with the job requirements:",
};

export class ProfMatchIaSettingTab extends PluginSettingTab {
	plugin: ProfMatchIaPlugin;

	constructor(app: App, plugin: ProfMatchIaPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", {
			text: "Professional Experience Summary Settings",
		});

		new Setting(containerEl)
			.setName("Experience Folder")
			.setDesc("Folder containing your experience Markdown files")
			.addText((text) =>
				text
					.setPlaceholder("Enter folder path")
					.setValue(this.plugin.settings.experienceFolder)
					.onChange(async (value) => {
						this.plugin.settings.experienceFolder = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Job Description File")
			.setDesc("Path to the job description Markdown file")
			.addText((text) =>
				text
					.setPlaceholder("Enter file path")
					.setValue(this.plugin.settings.jobDescriptionFile)
					.onChange(async (value) => {
						this.plugin.settings.jobDescriptionFile = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Output Folder")
			.setDesc("Folder to save the summarized Markdown files")
			.addText((text) =>
				text
					.setPlaceholder("Enter folder path")
					.setValue(this.plugin.settings.outputFolder)
					.onChange(async (value) => {
						this.plugin.settings.outputFolder = value;
						await this.plugin.saveSettings();
					})
			);


		containerEl.createEl("h2", {
			text: "Open AI Configurations",
		});

		new Setting(containerEl)
			.setName("OpenAI API Key")
			.setDesc("Enter your OpenAI API key")
			.addText((text) =>
				text
					.setPlaceholder("Enter your API key")
					.setValue(this.plugin.settings.apiKey)
					.onChange(async (value) => {
						this.plugin.settings.apiKey = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Prompt to summiraze")
			.setDesc(
				"You can customize the prompt used to summiraze the curriculum."
			)
			.addText((text) =>
				text
					.setPlaceholder("Enter your customized prompt")
					.setValue(this.plugin.settings.customPrompt)
					.onChange(async (value) => {
						this.plugin.settings.apiKey = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
