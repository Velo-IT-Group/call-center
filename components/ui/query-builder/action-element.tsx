import { Button } from '@/components/ui/button';
import type { ComponentPropsWithoutRef } from 'react';
import type { ActionWithRulesProps } from 'react-querybuilder';

export type ActionProps = ActionWithRulesProps & ComponentPropsWithoutRef<typeof Button>;

export const ActionElement = ({
	className,
	handleOnClick,
	label,
	title,
	disabled,
	disabledTranslation,
	// Props that should not be in extraProps
	testID: _testID,
	rules: _rules,
	level: _level,
	path: _path,
	context: _context,
	validation: _validation,
	ruleOrGroup: _ruleOrGroup,
	schema: _schema,
	...extraProps
}: ActionProps) => (
	<Button
		variant='ghost'
		className={className}
		title={disabledTranslation && disabled ? disabledTranslation.title : title}
		onClick={(e) => handleOnClick(e)}
		disabled={disabled && !disabledTranslation}
		{...extraProps}
	>
		{disabledTranslation && disabled ? disabledTranslation.label : label}
	</Button>
);

ActionElement.displayName = 'ActionElement';
