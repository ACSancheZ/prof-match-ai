import { App, TFile } from "obsidian";
import { SelectFileModal } from "./select-file-modal";
import { ProfMatchIaPluginSettings } from "src/plugin-settings";

export class SelectCvTemplatesModal extends SelectFileModal {
	// super(
	// 	app: App,
	// 	settings: ProfMatchIaPluginSettings,
	// 	title = "Select the Curriculum template file:"
	// ) {}

	getItems(): TFile[] {
		return this.app.vault
			.getMarkdownFiles()
			.filter((f, i) =>
				f.path.startsWith(this.settings.curriculumsFolder)
			);
	}
}
