import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'
import { AutoComplete } from 'primereact/autocomplete'

function User({ list }) {
  const [selectedProfile, setSelectedProfile] = useState()
  const [filteredProfiles, setFilteredProfiles] = useState([...list])

  const searchProfiles = (event) => {
    const searchTerm = event.query
    setTimeout(() => {
      if (searchTerm.trim().length) {
        setFilteredProfiles(
          filteredProfiles.filter((porfile) =>
            porfile.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        )
      }
    }, 250)
  }

  return (
    <>
      {filteredProfiles && (
        <div className="card p-d-flex p-jc-center p-mb-3">
          <AutoComplete
            dropdown
            dropdownIcon="pi pi-search"
            placeholder="Search a user"
            value={selectedProfile}
            completeMethod={searchProfiles}
            field="name"
            className="p-col-12 p-md-6"
            onChange={(event) => {
              setSelectedProfile(event.value)
            }}
          />
        </div>
      )}
      {filteredProfiles.map((user, key) => (
        <a href={`${user.username}`} key={`avatar-${key}`}>
          <Chip image={user.avatar} className="p-m-2" label={user.name} />
        </a>
      ))}
    </>
  )
}

User.propTypes = {
  list: PropTypes.array.isRequired,
}

export default User
