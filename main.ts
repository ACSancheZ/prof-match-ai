import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { IaCvMaker } from 'src/ia-cv-maker';
import { DEFAULT_SETTINGS, IaCvMakerPluginSettings, IaCvMakerSettingTab } from 'src/plugin-settings';
import { Utils } from 'src/utils';

export default class IaCvMakerPlugin extends Plugin {
	settings: IaCvMakerPluginSettings;
    iaCvMaker: IaCvMaker;
    utils: Utils;

	async onload() {
		console.log('Loading Professional Experience Summary plugin');
        await this.loadSettings();
        // process.env.OPENAI_API_KEY=this.settings.apiKey;
        // console.debug(`OPENAI_API_KEY: ${process.env.OPENAI_API_KEY}`)

        this.utils = new Utils(this.app, this);
        this.iaCvMaker = new IaCvMaker(this.app, this.settings);
        

        this.addCommand({
            id: 'generate-summary',
            name: 'Generate Summary',
            callback: async () => {
                if (!this.settings.apiKey) {
                    new Notice('API key is not set. Please configure the plugin settings.');
                    return;
                }
				//new Notice('OpenAi Key: '+ this.settings.apiKey);

                const experienceFiles = this.utils.getExperienceFiles(this.settings.experienceFolder);
                const jobDescription = await this.utils.getJobDescription(this.settings.jobDescriptionFile);

                if (!experienceFiles.length) {
                    new Notice('No experience files found in the configured folder.');
                    return;
                }

                if (!jobDescription) {
                    new Notice('Job description file not found.');
                    return;
                }
                
                let summaries = await this.iaCvMaker.getExpiriencesOrganized(experienceFiles, jobDescription);
                const summaryContent = await this.iaCvMaker.summarizeExperience(summaries, jobDescription);
                this.iaCvMaker.saveSummary(summaryContent, this.settings.outputFolder);

                //new Notice("Job Description: " + jobDescription);
                
                // const summaries = [];
                // for (const file of experienceFiles) {
                //     const content = fs.readFileSync(file, 'utf-8');
                //     const summary = await this.summarizeExperience(content, jobDescription);
                //     summaries.push({ content: summary, fileName: path.basename(file, '.md') });
                // }

                //this.saveSummaries(summaries, this.settings.outputFolder);
            }
        });

        this.addSettingTab(new IaCvMakerSettingTab(this.app, this));
	}

	async onunload() {

	}

	async loadSettings() {
	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
