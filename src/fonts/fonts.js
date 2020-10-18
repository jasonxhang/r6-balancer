import { createGlobalStyle } from 'styled-components';
import ScoutRegular from './Scout-Regular.otf';
import ScoutBlack from './Scout-Black.otf';
import ScoutBold from './Scout-Bold.otf';
import ScoutCondBlack from './ScoutCond-Black.otf';
import ScoutCondBold from './ScoutCond-Bold.otf';
import ScoutCondRegular from './ScoutCond-Regular.otf';

/* eslint no-unused-expressions: 0 */
export default createGlobalStyle`
  @font-face {
		font-family: 'Scout-Regular';    
		src: local('Scout-Regular'), local('Scout-Regular'),
		url('${ScoutRegular}') format('opentype');
	}
	@font-face {
		font-family: 'Scout-Black';    
		src: local('Scout-Black'), local('Scout-Black'),
		url('${ScoutBlack}') format('opentype');
	}
	@font-face {
		font-family: 'Scout-Bold';    
		src: local('Scout-Bold'), local('Scout-Bold'),
		url('${ScoutBold}') format('opentype');
	}
	@font-face {
		font-family: 'ScoutCond-Black';    
		src: local('ScoutCond-Black'), local('ScoutCond-Black'),
		url('${ScoutCondBlack}') format('opentype');
	}
	@font-face {
		font-family: 'ScoutCond-Bold';    
		src: local('ScoutCond-Bold'), local('ScoutCond-Bold'),
		url('${ScoutCondBold}') format('opentype');
	}
	@font-face {
		font-family: 'ScoutCond-Regular';    
		src: local('ScoutCond-Regular'), local('ScoutCond-Regular'),
		url('${ScoutCondRegular}') format('opentype');
	}
`;
