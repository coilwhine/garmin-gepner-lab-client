import { Link } from "react-router-dom";
import "./PrivacyStatementPage.scss";

function PrivacyStatementPage(): JSX.Element {
    return (
        <div className="PrivacyStatementPage">
            <h1>Privacy Statement</h1>
            <p>
                Participants in this study are assured that any information they provide will be treated with strict confidentiality. Data collected will be used for research purposes only and will be stored securely. Access to the data will be restricted to authorized personnel involved in the study.
            </p>
            <p>
                Data will be anonymized and aggregated for analysis. No identifiable information will be disclosed in any publications or presentations resulting from this study. Participation is voluntary, and participants may withdraw at any time without penalty.
            </p>
            <p>
                If you have any questions or concerns about the use of your data, please contact the principal investigator,
                Prof. Yftach Gepner, at <a href="tel: +972506828501"> +972-506828501</a> or <a href="mailto: gepner@tauex.tau.ac.il">gepner@tauex.tau.ac.il</a>.
            </p>

            <span>
                Thank you for your participation.
            </span>
            <Link to={"/"} className="btn">Return to The Main Page</Link>
        </div>
    );
}

export default PrivacyStatementPage;
