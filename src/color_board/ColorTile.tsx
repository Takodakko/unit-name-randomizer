

function ColorTile(props: {colorchange: string, randomizeArray: Function}) {
    function clicky() {
        props.randomizeArray();
    }
    return (
      <div className="colortile" style={{backgroundColor: props.colorchange}} onClick={clicky}>
      </div>
    )
  }
  
  export default ColorTile;