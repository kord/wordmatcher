import React, {Component} from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {OptionsPanel, OptionsPanelProps} from "./optionsPanel";
import '../css/buttons.css';

const MySwal = withReactContent(Swal);

export class OptionsButton extends Component<OptionsPanelProps> {
    constructor(props: OptionsPanelProps) {
        super(props);
    }

    showModal = (event: React.MouseEvent<HTMLDivElement>) => {
        MySwal.fire({
            title: <h2>Options</h2>,
            // icon: 'question',
            // html: <p>hamburger</p>,
            html: <OptionsPanel onChangeFn={this.props.onChangeFn}/>,
            width: '90%',
            // heightAuto: true,
            showCloseButton: true,
            showConfirmButton: false,

        });
    }


    render() {
        return (
            <div className={'game-control-button options-button'}
                    onClick={this.showModal}/>
        );
    }
}
