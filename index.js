import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import AnnualCumulativeView from './AnnualCumulativeView.js';
import './site.css';

const spUrl = "http://ull:2314/SolarPanelAPI/"


const dashboard = (
<div class="root">
	<div class="row">
		<div class="col-md-12">
			<AnnualCumulativeView 
				viewname = "Annual Cumulative" 
				url = {spUrl}/>
		</div>
	</div>
</div>
)

ReactDOM.render(dashboard, document.getElementById('root'));

