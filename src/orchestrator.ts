import { App, Notice } from "obsidian";
import { ProfMatchIaPluginSettings } from "./plugin-settings";
import { ProfMatchIa } from "./prof-match-ia";
import { Utils } from "./utils";

export default class Orchestrator {
	app: App;
	settings: ProfMatchIaPluginSettings;
	profMatchIa: ProfMatchIa;
	utils: Utils;

	constructor(
		app: App,
		settings: ProfMatchIaPluginSettings,
	) {
		this.app = app;
		this.settings = settings;
		this.profMatchIa = new ProfMatchIa(app, settings);
		this.utils = new Utils(app);
	}

	async summarize() {
		if (!this.settings.apiKey) {
			new Notice(
				"API key is not set. Please configure the plugin settings."
			);
			return;
		}

		const experienceFiles = this.utils.getExperienceFiles(
			this.settings.experienceFolder
		);
		const jobDescription = await this.utils.getJobDescription(
			this.settings.jobDescriptionFile
		);

		if (!experienceFiles.length) {
			new Notice("No experience files found in the configured folder.");
			return;
		}

		if (!jobDescription) {
			new Notice("Job description file not found.");
			return;
		}

		let summaries = await this.profMatchIa.getExpiriencesOrganized(
			experienceFiles,
			jobDescription
		);
		const summaryContent = await this.profMatchIa.summarizeExperience(
			summaries,
			jobDescription
		);
		this.profMatchIa.saveSummary(
			summaryContent,
			this.settings.outputFolder
		);
	}
}
