import React from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

const FilterButton = ({handleToggle}) => (
    <Accordion styled>
      <Accordion.Title onClick={handleToggle}>
        <Icon name='dropdown' />
        タイプや条件で探す
      </Accordion.Title>
    </Accordion>
  )

export default FilterButton