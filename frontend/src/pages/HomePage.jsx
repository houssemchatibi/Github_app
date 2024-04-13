import React, { useEffect, useState, useCallback } from 'react'

import toast from "react-hot-toast";
import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import Spinner from '../components/Spinner';

const HomePage = () => {

	const [userProfile, setUserProfile] = useState(null);
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [sortType, setSortType] = useState("recent");

	const getUserProfileAndRepos = useCallback(async (username="houssemchatibi") => {

		setLoading(true);

		try {
			const userRes = await fetch(`https://api.github.com/users/${username}`);
			const userProfile = await userRes.json();
			setUserProfile(userProfile);


			const repoRes = await fetch(userProfile.repos_url);
			const repos = await repoRes.json();
			setRepos(repos);
			console.log(userProfile);
			console.log(repos);
			return { userProfile, repos };

		}
		catch (error) {
			toast.error(error.message)
		}
		finally {
			setLoading(false)
		}
	}, []);

	const onSearch = async (e, username) => {
		e.preventDefault();

		setLoading(true);
		setRepos([]);
		setUserProfile(null);

		const { userProfile, repos } = await getUserProfileAndRepos(username);

		setUserProfile(userProfile);
		setRepos(repos);
		setLoading(false);
		console.log("userrrr",userProfile)
	}


	useEffect(() => {
		getUserProfileAndRepos();
	}, [getUserProfileAndRepos]);
	return (
		<div className='m-4'>
			<Search onSearch={onSearch}/>
			<SortRepos />
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
				{ !loading && <Repos repos={repos }  />}
				{loading && <Spinner />}
			</div>
		</div>
	)
}

export default HomePage