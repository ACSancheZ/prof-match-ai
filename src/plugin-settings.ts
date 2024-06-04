import ProfMatchIaPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface ProfMatchIaPluginSettings {
	apiKey: string;
	model: string;
	experienceFolder: string;
	curriculumsFolder: string;
	jobOpportunitiesFolder: string;
	outputFolder: string;
	jobDescriptionPrompt: string;
	jobExperiencePrompt: string;
}

export const DEFAULT_SETTINGS: ProfMatchIaPluginSettings = {
	apiKey: "",
	model: "gpt-3.5-turbo",
	experienceFolder: "cv/experiences",
	curriculumsFolder: "cv/templates",
	jobOpportunitiesFolder: "cv/job-opportunities",
	outputFolder: "cd/resumes",
	jobDescriptionPrompt: "Given the job description: {{job-description}}",
	jobExperiencePrompt: "Please, elaborate (500 characters maximum) with your words a job experience in bullets points with the strongest characteristics that match with the job description. My experience is:\n\n{{job-experience}}\n\n\nThe output format should be:\n#### Job Title | Company | Started Date - Finished Date (year and month name)\n- Bullet points",
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
			.setName("Job Experience Folder")
			.setDesc("Folder containing your job experiences markdown files (Each job experience should be a Note).")
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
			.setName("Curriculum Templates Folder")
			.setDesc("Folder containing your curriculums templates notes. IMPORTANT: please add to your curriculum tamplate the place holder: '{{{{Job-Experiences}}}}'. You can find a example at ")
			.addText((text) =>
				text
					.setPlaceholder("Enter folder path")
					.setValue(this.plugin.settings.curriculumsFolder)
					.onChange(async (value) => {
						this.plugin.settings.curriculumsFolder = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Job Opportunities Folder")
			.setDesc("Folder containing the job description notes")
			.addText((text) =>
				text
					.setPlaceholder("Enter file path")
					.setValue(this.plugin.settings.jobOpportunitiesFolder)
					.onChange(async (value) => {
						this.plugin.settings.jobOpportunitiesFolder = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Output Folder")
			.setDesc("Folder to save the summarized curriculums in a note")
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
			.setName("Chat GPT Model")
			.setDesc("Enter the model that you want to use.")
			.addText((text) =>
				text
					.setPlaceholder("Enter the model")
					.setValue(this.plugin.settings.model)
					.onChange(async (value) => {
						this.plugin.settings.model = value;
						await this.plugin.saveSettings();
					})
			);

			new Setting(containerEl)
			.setName("Prompt to identify the Job Description")
			.setDesc(
				"You can customize the prompt used to ChatGPT read the Job Description.\n\nIMPORTANT: please add the placeholder '{{job-description}}'"
			)
			.addText((text) =>
				text
					.setPlaceholder("Enter your customized prompt")
					.setValue(this.plugin.settings.jobDescriptionPrompt)
					.onChange(async (value) => {
						this.plugin.settings.jobDescriptionPrompt = value;
						await this.plugin.saveSettings();
					})
			);

			new Setting(containerEl)
			.setName("Prompt to summiraze one Job Experience")
			.setDesc(
				"You can customize the prompt used to summiraze each job experience that will be added in the curriculum.\n\nIMPORTANT: please add the placeholder '{{job-experience}}'"
			)
			.addText((text) =>
				text
					.setPlaceholder("Enter your customized prompt")
					.setValue(this.plugin.settings.jobExperiencePrompt)
					.onChange(async (value) => {
						this.plugin.settings.jobExperiencePrompt = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
