import {Component} from "react";
import '../css/optionsPanel.css';

interface OptionsPanelProps {
}

interface OptionsPanelState {
}

export class OptionsPanel extends Component<OptionsPanelProps, OptionsPanelState> {
    constructor(props: OptionsPanelProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={'options-panel'}>
                    <div className={'options-panel__flex'}>
                    <h2 className={'options-panel__section-name'}>Game Length</h2>
                    <h2 className={'options-panel__section-name'}>Word List</h2>

                </div>
            </div>
        );
    }
}