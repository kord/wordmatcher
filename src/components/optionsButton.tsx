import React, {Component} from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {OptionsPanel, OptionsPanelProps} from "./OptionsPanel";
import '../css/optionsButton.css';

const MySwal = withReactContent(Swal);

export class OptionsButton extends Component<OptionsPanelProps> {
    constructor(props: OptionsPanelProps) {
        super(props);
    }

    showModal = (event: React.MouseEvent<HTMLDivElement>) => {
        MySwal.fire({
            title: <h1>Options</h1>,
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
            <div className={'options-button'}
                    onClick={this.showModal}/>
        );
    }
}
