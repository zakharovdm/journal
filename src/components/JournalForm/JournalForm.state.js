export const INITIAL_STATE = {
	isValid: {
		title: true,
		text: true,
		date: true
	},

	values: {
		title: undefined,
		text: undefined,
		date: undefined
	},

	isFormReadyToSubmit: false
};

export function formReducer(state, action) {
	switch (action.type) {
	case 'RESET_VALIDITY':
		return { ...state, isValid: INITIAL_STATE.isValid };

	case 'SUBMIT': {
		const titleValidity = action.payload.title?.trim().length;
		const textValidity = action.payload.text?.trim().length;
		const dateValidtiy = action.payload.date;
		return {
			values: action.payload,
			isValid: {
				title: titleValidity,
				text: textValidity,
				date: dateValidtiy
			},
			isFormReadyToSubmit: titleValidity && textValidity && dateValidtiy
		};
	}
	}
}
