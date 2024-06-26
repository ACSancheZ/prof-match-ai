import ProfMatchIaPlugin from "main";
import { App, TFile } from "obsidian";

export class Utils {
	app: App;

	constructor(app: App) {
		this.app = app;
	}

	getExperienceFiles(folderPath: string): TFile[] {
		console.debug("folderPath: " + folderPath);
		const allFiles = this.app.vault.getMarkdownFiles();
		return allFiles.filter((file: TFile) => {
			//console.debug("file: " + file.path);
			return file.path.startsWith(folderPath);
		});
	}

	async getJobDescription(filePath: string): Promise<string | null> {
		const file = this.app.vault.getAbstractFileByPath(filePath);
		if (file && file instanceof TFile) {
			return await this.app.vault.read(file);
		}
		return null;
	}
}
