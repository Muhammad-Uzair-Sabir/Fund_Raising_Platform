function App() {
    const [page, setPage] = React.useState('home');
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage />;
            case 'create':
                return <CreateCampaignPage />;
            case 'dashboard':
                return <DashboardPage />;
            case 'auth':
                return <AuthPage setIsAuthenticated={setIsAuthenticated} />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div>
            <header>
                <div className="container">
                    <h1>FundRaiser</h1>
                    <nav>
                        <ul>
                            <li><a href="#" onClick={() => setPage('home')}>Home</a></li>
                            <li><a href="#" onClick={() => setPage('create')}>Create Campaign</a></li>
                            <li><a href="#" onClick={() => setPage('dashboard')}>Dashboard</a></li>
                            {isAuthenticated ? (
                                <li><a href="#" onClick={() => setIsAuthenticated(false)}>Logout</a></li>
                            ) : (
                                <li><a href="#" onClick={() => setPage('auth')}>Login</a></li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="container">
                {renderPage()}
            </main>
        </div>
    );
}

function HomePage() {
    const campaigns = [
        { id: 1, title: "Save the Rainforest", goal: 50000, raised: 35000, image: "https://via.placeholder.com/300x200" },
        { id: 2, title: "Clean Ocean Initiative", goal: 30000, raised: 12000, image: "https://via.placeholder.com/300x200" },
        { id: 3, title: "Education for All", goal: 20000, raised: 18000, image: "https://via.placeholder.com/300x200" },
    ];

    return (
        <div>
            <h2>Featured Campaigns</h2>
            <div className="campaign-list">
                {campaigns.map(campaign => (
                    <div key={campaign.id} className="campaign-card">
                        <img src={campaign.image} alt={campaign.title} />
                        <h3>{campaign.title}</h3>
                        <p>Goal: ${campaign.goal.toLocaleString()}</p>
                        <div className="progress-bar">
                            <span 
                                className="progress-bar-fill" 
                                style={{width: `${(campaign.raised / campaign.goal) * 100}%`}}
                            ></span>
                        </div>
                        <p>${campaign.raised.toLocaleString()} raised</p>
                        <button className="btn">Donate Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CreateCampaignPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Campaign created');
    };

    return (
        <div>
            <h2>Create a New Campaign</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Campaign Title</label>
                    <input type="text" id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="goal">Fundraising Goal</label>
                    <input type="number" id="goal" name="goal" required />
                </div>
                <div>
                    <label htmlFor="description">Campaign Description</label>
                    <textarea id="description" name="description" required></textarea>
                </div>
                <div>
                    <label htmlFor="image">Campaign Image</label>
                    <input type="file" id="image" name="image" accept="image/*" required />
                </div>
                <button type="submit" className="btn">Create Campaign</button>
            </form>
        </div>
    );
}

function DashboardPage() {
    const campaignData = {
        title: "Save the Rainforest",
        goal: 50000,
        raised: 35000,
        donors: 250,
        daysLeft: 15
    };

    return (
        <div className="dashboard">
            <h2>{campaignData.title} - Dashboard</h2>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>${campaignData.raised.toLocaleString()}</h3>
                    <p>Raised of ${campaignData.goal.toLocaleString()} goal</p>
                </div>
                <div className="stat-card">
                    <h3>{campaignData.donors}</h3>
                    <p>Total Donors</p>
                </div>
                <div className="stat-card">
                    <h3>{campaignData.daysLeft}</h3>
                    <p>Days Left</p>
                </div>
            </div>
            <div className="progress-bar">
                <span 
                    className="progress-bar-fill" 
                    style={{width: `${(campaignData.raised / campaignData.goal) * 100}%`}}
                ></span>
            </div>
            <button className="btn">Edit Campaign</button>
        </div>
    );
}

function AuthPage({ setIsAuthenticated }) {
    const [isLogin, setIsLogin] = React.useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setIsAuthenticated(true);
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className="btn">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <a href="#" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </a>
            </p>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));