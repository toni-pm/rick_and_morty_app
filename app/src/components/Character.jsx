import React from 'react'
import propTypes from 'prop-types'

const Character = props => {
  const { data } = props
  const { name, status, image } = data

  return (
    <div>
      <img src={image} alt='Character' />
      <div>
        <h2>
          {name}
        </h2>
        <p>
          <span>Status: {status}</span>
        </p>
      </div>
    </div>
  )
}

Character.propTypes = {
  data: propTypes.object
}

export default Character
