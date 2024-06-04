import { App, Notice } from "obsidian";
import { ProfMatchIaPluginSettings } from "./plugin-settings";
import { ProfMatchIa } from "./prof-match-ia";
import { Utils } from "./utils";
import { SelectCvTemplatesModal } from "./modals/select-cv-templates-modal";
import { SelectJobOpportunityModal } from "./modals/select-job-opportunity-modal";

export default class Orchestrator {
	app: App;
	settings: ProfMatchIaPluginSettings;
	profMatchIa: ProfMatchIa;
	utils: Utils;

	constructor(app: App, settings: ProfMatchIaPluginSettings) {
		this.app = app;
		this.settings = settings;
		this.profMatchIa = new ProfMatchIa(app, settings);
		this.utils = new Utils(app);
	}

	async summarize() {
		if (!this.settings.apiKey) {
			new Notice("API key is not set. Please configure the plugin settings.");
			return;
		}

		const templateContent = await this.getCvTemplateContent()??"";
		const jobOpportunityContent = await this.getJobOpportunityContent()??"";

		const experienceFiles = this.utils.getExperienceFiles(this.settings.experienceFolder);
		if (!experienceFiles.length) {
			new Notice("No experience files found in the configured folder.");
			return;
		}

		let summaries = await this.profMatchIa.getExpiriencesNotesFromFolder(experienceFiles);

		const summaryContent = await this.profMatchIa.summarizeExperience(
			summaries,
			jobOpportunityContent
		);

		const content = templateContent.replace("{{Job-Experiences}}", summaryContent);

		this.profMatchIa.saveSummary(
			content,
			this.settings.outputFolder
		);
	}

	async getCvTemplateContent() {
		//Extract to method getCvTemplateContent()
		const template = await new SelectCvTemplatesModal(
			this.app,
			this.settings
		).open();
		if (template == null) return;
		const templateContent = await this.app.vault.read(template);
		if (!templateContent.length) {
			new Notice("No experience files found in the configured folder.");
			return;
		}
		return templateContent;
	}

	async getJobOpportunityContent(){
		//Extract to method getJobOpportunityContent()
		let jobOpportunity = await new SelectJobOpportunityModal(
			this.app,
			this.settings
		).open();
		if (jobOpportunity == null) return;
		const jobOpportunityContent = await this.app.vault.read(jobOpportunity);
		if (!jobOpportunityContent) {
			new Notice("Job description file not found.");
			return;
		}
		return jobOpportunityContent;
	}
}
