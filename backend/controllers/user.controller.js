import User from "../models/user.model.js"


export const getUserProfileAndRepos = async (req, res) => {
	const { username } = req.params;
	try {
		// 60 requests per hour, 5000 requests per hour for authenticated requests
		// https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
		const userRes = await fetch(`https://api.github.com/users/${username}`, {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
		});

		const userProfile = await userRes.json();

		const repoRes = await fetch(userProfile.repos_url, {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
		});
		const repos = await repoRes.json();

		res.status(200).json({ userProfile, repos });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const likeProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findById(req.user._id.toString());

        console.log("user connected", user);

        const userToLike = await User.findOne({ username });

        console.log("user to likeProfile", userToLike);

        if (!userToLike) {
            return res.status(404).json({ error: "User is not a member" });
        }

        if (user.likedProfiles.includes(username)) { // Check if the username is already in the likedProfiles array
            return res.status(400).json({ error: "User already liked" });
        }

        // Push the username string into the likedProfiles array
        user.likedProfiles.push(username);
        // Push the user details into the likedBy array
        userToLike.likedBy.push({ username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now() });

        await Promise.all([userToLike.save(), user.save()]);

        res.status(200).json({ message: "User liked" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getLikes = async (req, res) => {

try {

	const user = await User.findById(req.user._id.toString());
    
	req.status(200).json({likedBy:user.likedBy});

} catch (error) {
	
	req.status(500).json({error:error.message});
}

}