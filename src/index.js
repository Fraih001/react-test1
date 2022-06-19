import React from 'react';
import ReactDOM from 'react-dom';

const api = require('./api');

const root = document.querySelector('#root');

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            users: [],
            phones: []
        }
    };

    async componentDidMount(){
        let response = await api.fetchUsers();
        this.setState({ users: response.data });

        response = await api.fetchPhones();
        this.setState({ phones: response.data });
    }

    render() {

        const { users, phones } = this.state;

        return (
            <div>
                <h1>Users and Phones</h1>
                <main>
                    <section>
                    <h2>Users</h2>
                    {
                        users.map(user => { 
                            return <li key={ user.id }>{ user.name }</li>
                        })
                    }
                    </section>
                    <section>
                    <h2>Phones</h2>
                    {
                        phones.map(phone => { 
                            return <li key={ phone.id }>{ phone.name }</li>
                        })
                    }
                    </section>
                </main>
            </div>
        )
    }
}

ReactDOM.render(
    React.createElement(App),
    root
)