const Rank = ({ name, entries }) => {
  return (
    <div className="white f3 center">
      {`${name}, your current entries count ${entries}`}
    </div>
  )
}

export default Rank;