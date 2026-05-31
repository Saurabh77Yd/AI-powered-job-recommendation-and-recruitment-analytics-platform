export const calculateMatch = (
    userSkills = [],
    jobSkills = []
) =>{
    const matchedSkills = userSkills.filter((skill)=>
        jobSkills.some(
            (jobSkill)=> jobSkill.toLowerCase() === skill.toLowerCase()
        )
    );
    const missingSkills = jobSkills.filter((jobSkill) =>
        !userSkills.some(
            (skill)=> skill.toLowerCase() === jobSkill.toLowerCase()
        )
    );

    const matchPercentage = jobSkills.length ===0 ? 0 : Math.round(
        (matchedSkills.length/jobSkills.length)*100
    );

    return {
        matchPercentage,
        matchedSkills,
        missingSkillss
    };
};