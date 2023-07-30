export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="die-div" style={styles} onClick={props.holdDice}>
      <h2 className="die-number" style={styles}>
        {props.value}
      </h2>
    </div>
  );
}
