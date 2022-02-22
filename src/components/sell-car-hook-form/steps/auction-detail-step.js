import WYSIWYGEditor from "../../WYSIWYGEditor/WYSIWYGEditor";
import classes from "../sell-car-hook-form.module.css";

const AuctionDetailStep = ({control}) => {
  return (
      <fieldset className={classes.detailsStep}>
          <h2>Car detail</h2>
          <label>Highlights</label>
          <WYSIWYGEditor editorName='highlights' control={control}/>
          <label>Equipment</label>
          <WYSIWYGEditor editorName='equip' control={control}/>
          <label>Modifications</label>
          <WYSIWYGEditor editorName='mods' control={control}/>
          <label>Known Flaws</label>
          <WYSIWYGEditor editorName='flaws' control={control}/>
          <label>Recent Service History</label>
          <WYSIWYGEditor editorName='service_history' control={control}/>
          <label>Other Items Included in Sale</label>
          <WYSIWYGEditor editorName='other_items' control={control}/>
          <label>Ownership History</label>
          <WYSIWYGEditor editorName='owner_history' control={control}/>
      </fieldset>
  )
}

export default AuctionDetailStep;