interface SummaryContentProps {
    totalUsers: number
    totalTweets: number
    tweetsInLastFiveMinutes: number
}
const SummaryContent: React.FC<SummaryContentProps> = ({
    totalUsers,
    totalTweets,
    tweetsInLastFiveMinutes
}) => {
    return(
        <div className="mb-4 bg-gray-200 p-4 rounded-lg shadow-md flex justify-around">
            <p className="text-lg font-bold">Total Users: {totalUsers}</p>
            <p className="text-lg font-bold">Total Tweets: {totalTweets}</p>
            <p className="text-lg font-bold">Tweets in Last 5 Minutes: {tweetsInLastFiveMinutes}</p>
      </div>
    )
}

export { SummaryContent }