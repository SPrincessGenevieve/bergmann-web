type TooltipItem = {
  name?: string
  value?: number
  color?: string
  dataKey?: string
  payload?: Record<string, any>
};

interface ChartTooltipContentProps extends React.ComponentProps<"div"> {
  active?: boolean
  payload?: TooltipItem[]
  className?: string
  label?: string | React.ReactNode
  labelFormatter?: (
    label: string | React.ReactNode,
    payload: TooltipItem[]
  ) => React.ReactNode
  formatter?: (
    value: number,
    name: string,
    item: TooltipItem,
    index: number,
    payload?: Record<string, any>
  ) => React.ReactNode
  nameKey?: string
  labelKey?: string
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  color?: string
  labelClassName?: string
}

interface ChartLegendContentProps
  extends Omit<React.ComponentProps<"div">, "payload"> {
  payload?: TooltipItem[]
  verticalAlign?: "top" | "bottom"
  hideIcon?: boolean
  nameKey?: string
}
