import React from 'react'

const Detail = ( {match}) => (
  <div>
    <h2>Detail:{match.params.link}</h2>
  </div>
)
export default Detail