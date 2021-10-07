import './Home.css'

import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'primereact/progressbar'
import { AutoComplete } from 'primereact/autocomplete'

import Placeholders from './Placeholders'
import Users from './Users'

function Home() {
  const [showProgress, setShowProgress] = useState(true)
  const [list, setList] = useState([])
  const [skeleton, setskeleton] = useState(true)
  let filteredProfiles

  useEffect(() => {
    fetch('/list.json')
      .then((response) => response.json())
      .then((data) => data.sort((a, b) => a.username.localeCompare(b.username)))
      .then((data) => setList(data))
      .catch((error) => {
        console.log('Home useEffect', error)
        alert('An error occurred please try again later.')
      })
      .finally(() => {
        setShowProgress(false)
        setTimeout(() => {
          setskeleton(false)
        }, 500)
      })
  }, [])

  const searchProfiles = (event) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        filteredProfiles = [...list]
      } else {
        filteredProfiles = list.filter((porfile) =>
          porfile.name.toLowerCase().includes(event.query.toLowerCase()),
        )
      }
      setList(filteredProfiles)
    }, 800)
  }

  return (
    <main>
      {list && (
        <div className="card p-d-flex p-jc-center p-mb-3">
          <AutoComplete
            dropdown
            dropdownIcon="pi pi-search"
            placeholder="Search a user"
            suggestions={filteredProfiles}
            completeMethod={searchProfiles}
            field="name"
            className="p-col-12 p-md-6"
          />
        </div>
      )}
      {showProgress && <ProgressBar mode="indeterminate" />}
      {skeleton ? <Placeholders list={list} /> : <Users list={list} />}
    </main>
  )
}

export default Home
