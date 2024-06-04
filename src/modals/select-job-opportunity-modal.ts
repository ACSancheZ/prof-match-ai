import { App, TFile } from "obsidian";
import { SelectFileModal } from "./select-file-modal";
import { ProfMatchIaPluginSettings } from "src/plugin-settings";

export class SelectJobOpportunityModal extends SelectFileModal {
	// super(
	// ) {
    //     this.super(title = "Select the Job Opportunity file:");
    // }    

	getItems(): TFile[] {
		return this.app.vault
			.getMarkdownFiles()
			.filter((f, i) =>
				f.path.startsWith(this.settings.jobOpportunitiesFolder)
			);
	}
}
