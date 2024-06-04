import {Plugin} from "obsidian";
import {
	DEFAULT_SETTINGS,
	ProfMatchIaPluginSettings,
	ProfMatchIaSettingTab,
} from "src/plugin-settings";
import Orchestrator from "src/orchestrator";

export default class ProfMatchIaPlugin extends Plugin {
	settings: ProfMatchIaPluginSettings;
	private orchestrator: Orchestrator;
	template_folder: string;

	async onload() {
		console.log("Loading Professional Experience Summary plugin");
		await this.loadSettings();
		this.orchestrator = new Orchestrator(this.app, this.settings);

		this.addCommand({
			id: "generate-summary",
			name: "Generate Summary",
			callback: async () => {
				this.orchestrator.summarize();
			},
		});

		this.addSettingTab(new ProfMatchIaSettingTab(this.app, this));
	}

	async onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
