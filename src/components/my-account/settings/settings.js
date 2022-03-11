import classes from "./settings.module.css";

const MyAccountSettings = ({userData}) => {
    return (
        <div className={classes.accountSettings}>
            <h1>Settings</h1>
            <div className={classes.section}>
                <h2>Account</h2>
                <div className={classes.flexColumn}>
                    <span>Linked accounts</span>
                    <div className={classes.accountAction}>
                        <div>{userData.email}</div>
                        <button className="btn btn-secondary">Remove account</button>
                    </div>
                    <span>Linked accounts</span>
                    <div className={classes.accountAction}>
                        <div className={classes.pass}>Non set</div>
                        <button className="btn btn-secondary">Set password</button>
                    </div>
                </div>
            </div>
            <div className={classes.section}>
                <h2>Payment info for bidding</h2>
                <button type="button" className="btn btn-primary">Register to bid</button>
            </div>
        </div>
    )
}

export default MyAccountSettings;