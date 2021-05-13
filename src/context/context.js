import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {

    const [user, setUser] = React.useState('')
    const [githubUser, setGithubUser] = useState(mockUser)
    const [followers, setFollowers] = useState(mockFollowers)
    const [repos, setRepos] = useState(mockRepos)
    const [requests, setRequests] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ show: false, msg: "" })

    const GitUser = async (user) => {
        toggleError()
        setLoading(true)
        const response = await axios(`${rootUrl}/users/${user}`)
            .catch(err => console.log(err))
        if (response) {
            setGithubUser(response.data)
            const { followers_url } = response.data
            Promise.allSettled([axios(`${rootUrl}/users/${user}/repos?per_page=100`), axios(`${followers_url}?per_page=100`)])
                .then((result) => {
                    const [reposs, follower] = result
                    const status = "fulfilled"
                    if (reposs.status === status) {
                        setRepos(reposs.value.data)
                    }
                    if (follower.status === status) {
                        setFollowers(follower.value.data)
                    }
                })
                .catch(err => console.log(err))

            // axios(`${rootUrl}/users/${user}/repos?per_page=100`)
            //     .then((response) => {
            //         setRepos(response.data)
            //     })

            // axios(`${followers_url}`)
            //     .then((response) => {
            //         setFollowers(response.data)
            //     })

        } else {
            toggleError(true, "there is no user with that username")
        }
        checkRequest()
        setLoading(false)
    }

    const checkRequest = () => {
        axios(`${rootUrl}/rate_limit`)
            .then(({ data }) => {
                let { rate: { remaining } } = data
                setRequests(remaining)
                if (remaining === 0) {
                    toggleError(true, "Sorry, you have exceded your hourly rate limit !!")
                }
            })
            .catch(err => console.log(err))
    }

    function toggleError(show = false, msg = "") {
        setError({ show, msg })
    }

    useEffect(checkRequest, [])

    return <GithubContext.Provider value={{ user, GitUser, loading, setUser, requests, error, githubUser, followers, repos }}>{children}</GithubContext.Provider>
}

export { GithubContext, GithubProvider }










