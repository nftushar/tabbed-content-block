/**
 * @props device: 'desktop' (String)
 * @props onChange: (Function)
 * @props style: {} (Object)
 * @return Selected device
 */

import { useState } from '@wordpress/element';

import './BDevice.scss';
import { desktopIcon, tabletIcon, mobileIcon } from '../utils/icons';

const BDevice = ({ device = 'desktop', onChange, className = 'iconButton', style }) => {
	const [show, setShow] = useState(false);

	window.addEventListener('click', () => setShow(false));

	return <div className={'bDevice'} style={style}>
		{!show && <button className={className} title={device[0].toUpperCase() + device.slice(1)} onClick={(event) => {
			setShow(true);
			event.stopPropagation();
		}}>
			{device == 'desktop' ? desktopIcon : device == 'tablet' ? tabletIcon : mobileIcon}
		</button>}

		{show && <div className={'bDevicePopup'}>
			{[
				{ value: 'desktop', icon: desktopIcon },
				{ value: 'tablet', icon: tabletIcon },
				{ value: 'mobile', icon: mobileIcon }
			].map(({ icon, value }) => <button key={value} className={className} title={value[0].toUpperCase() + value.slice(1)} onClick={() => {
				onChange(value);
				setShow(false);
			}}>{icon}</button>)}
		</div>}
	</div>
};
export default BDevice;