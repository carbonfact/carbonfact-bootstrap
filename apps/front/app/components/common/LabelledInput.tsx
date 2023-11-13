import { Text, TextField } from '@radix-ui/themes';

interface LabelledInputProps {
  label: string;
  value: string | number;
  type: 'text' | 'number';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const LabelledInput: React.FC<LabelledInputProps> = ({
  label,
  value,
  type,
  onChange,
}) => (
  <label>
    <Text as="div" size="2" mb="1" weight="bold">
      {label}
    </Text>
    <TextField.Input value={value} type={type} onChange={onChange} />
  </label>
);

export default LabelledInput;
