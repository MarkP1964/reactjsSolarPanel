import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import AnnualCumulativeView from './AnnualCumulativeView.js';

const dashboard = (
<div class="row">
	<div class="col-md-5">
		<AnnualCumulativeView viewname = "Annual Cumulative" url = "http://ull:2314/SolarPanelAPI/GetAnnualCumulativeView"/>
	</div>
</div>
)

ReactDOM.render(dashboard, document.getElementById('root'));

