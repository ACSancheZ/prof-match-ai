import {
	App,
	FuzzySuggestModal,
	Notice,
	TFile,
} from "obsidian";
import { ProfMatchIaPluginSettings } from "../plugin-settings";

export abstract class SelectFileModal extends FuzzySuggestModal<TFile> {
	private resolveFunction: (value: TFile | null) => void; // | null
	protected settings: ProfMatchIaPluginSettings;

	constructor(
		app: App,
		settings: ProfMatchIaPluginSettings,
		title: string = "Select a file:"
	) {
		super(app);
		this.settings = settings;
		this.setPlaceholder(title);
	}

	async open(): Promise<TFile | null> {
		return new Promise((resolve) => {
			this.resolveFunction = resolve;
			super.open();
		});
	}

	onChooseItem(file: TFile, _evt: MouseEvent | KeyboardEvent): void {
		this.resolveFunction(file);
		new Notice(`Selected ${file.name}`);
	}

	getItemText(file: TFile): string {
		return file.name;
	}

	onClose(): void {
		super.onClose();
	}
}
