import "./styles/spinner.css"
const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  return (


    
    <div style={{display :"flex",flexDirection : "row", justifyContent : "center",alignItems : "center"}}>


{isLoading &&

      <div className="loading-spinner">

      </div>
}
        </div>
  )
}

export default Spinner