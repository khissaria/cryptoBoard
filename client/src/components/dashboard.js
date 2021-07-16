import React, { useRef } from "react";
import { Doughnut, Line,Bar,Pie } from "react-chartjs-2";
import { chartColors } from "./colors";

function Dashboard({ price }) {
    
    const opts = {
        maintainAspectRatio: false,
        datasets: [{
            data: { price },
            backgroundColor: '#fff',
        }],
        responsive: true,

    };

    return (
        <div className="dashboard">
            {/* <div class="container">
                <div className="tile job">
                    <div className="header">
                        <div className="count">4</div>
                        <div className="title">Jobs</div>
                    </div>
                    <div className="body">
                        <div className="title">Awaiting Scope of Works</div>
                    </div>
                </div>
            </div> */}

            <div className="chart-container">
                <Doughnut data={price} options={opts} width={'auto'} height={'300px'}/>
            </div>
        </div>
    );
}

export default Dashboard;