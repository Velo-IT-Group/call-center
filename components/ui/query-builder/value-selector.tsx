import type { ComponentPropsWithoutRef } from 'react';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { VersatileSelectorProps } from 'react-querybuilder';
import { MultiSelect } from './multi-select';
import { toSelectOptions } from './utils';

export type ValueSelectorProps = VersatileSelectorProps & ComponentPropsWithoutRef<typeof Select>;

export const ValueSelector = ({
	handleOnChange,
	options,
	value,
	title,
	disabled,
	// Props that should not be in extraProps
	testID: _testID,
	rule: _rule,
	rules: _rules,
	level: _level,
	path: _path,
	context: _context,
	validation: _validation,
	operator: _operator,
	field: _field,
	fieldData: _fieldData,
	multiple: _multiple,
	listsAsArrays: _listsAsArrays,
	schema: _schema,
	...extraProps
}: ValueSelectorProps) => {
	return _multiple ? (
		<MultiSelect
			options={options}
			value={value}
			onValueChange={handleOnChange}
		/>
	) : (
		<Select
			value={value}
			disabled={disabled}
			onValueChange={handleOnChange}
			{...extraProps}
		>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder={title} />
			</SelectTrigger>
			<SelectContent>{toSelectOptions(options)}</SelectContent>
		</Select>
	);
};

ValueSelector.displayName = 'ValueSelector';
