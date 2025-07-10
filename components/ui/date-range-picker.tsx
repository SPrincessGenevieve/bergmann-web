/* eslint-disable max-lines */
"use client";

import React, { type FC, useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { DateInput } from "./date-input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Switch } from "./switch";
import { ChevronUpIcon, ChevronDownIcon, CheckIcon, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DateRangePickerProps {
  onUpdate?: (values: { range: DateRange; rangeCompare?: DateRange }) => void;
  initialDateFrom?: Date | string;
  initialDateTo?: Date | string;
  initialCompareFrom?: Date | string;
  initialCompareTo?: Date | string;
  align?: "start" | "center" | "end";
  locale?: string;
  showCompare?: boolean;
}

interface DateRange {
  from: Date;
  to: Date | undefined;
}

interface Preset {
  name: string;
  label: string;
}

const formatDate = (date: Date, locale: string = "en-us"): string => {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getDateAdjustedForTimezone = (dateInput: Date | string): Date => {
  if (typeof dateInput === "string") {
    const parts = dateInput.split("-").map((part) => parseInt(part, 10));
    return new Date(parts[0], parts[1] - 1, parts[2]);
  } else {
    return dateInput;
  }
};

const DateRangePickerComponent: FC<DateRangePickerProps> = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  initialCompareFrom,
  initialCompareTo,
  onUpdate,
  align = "end",
  locale = "en-US",
  showCompare = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateRange>({
    from: getDateAdjustedForTimezone(initialDateFrom),
    to: initialDateTo
      ? getDateAdjustedForTimezone(initialDateTo)
      : getDateAdjustedForTimezone(initialDateFrom),
  });

  const [rangeCompare, setRangeCompare] = useState<DateRange | undefined>(
    initialCompareFrom
      ? {
          from: new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
          to: initialCompareTo
            ? new Date(new Date(initialCompareTo).setHours(0, 0, 0, 0))
            : new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
        }
      : undefined
  );

  const openedRangeRef = useRef<DateRange | undefined>(undefined);
  const openedRangeCompareRef = useRef<DateRange | undefined>(undefined);

  const [selectedPreset, setSelectedPreset] = useState<string | undefined>();
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 960 : false
  );

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmallScreen(window.innerWidth < 960);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const getPresetRange = (presetName: string): DateRange => {
  //   const preset = PRESETS.find(({ name }) => name === presetName);
  //   if (!preset) throw new Error(`Unknown preset: ${presetName}`);
  //   const from = new Date();
  //   const to = new Date();
  //   const first = from.getDate() - from.getDay();

  //   switch (preset.name) {
  //     case "today":
  //       from.setHours(0, 0, 0, 0);
  //       to.setHours(23, 59, 59, 999);
  //       break;
  //     case "yesterday":
  //       from.setDate(from.getDate() - 1);
  //       from.setHours(0, 0, 0, 0);
  //       to.setDate(to.getDate() - 1);
  //       to.setHours(23, 59, 59, 999);
  //       break;
  //     case "last7":
  //       from.setDate(from.getDate() - 6);
  //       from.setHours(0, 0, 0, 0);
  //       to.setHours(23, 59, 59, 999);
  //       break;
  //     case "last14":
  //       from.setDate(from.getDate() - 13);
  //       from.setHours(0, 0, 0, 0);
  //       to.setHours(23, 59, 59, 999);
  //       break;
  //     case "last30":
  //       from.setDate(from.getDate() - 29);
  //       from.setHours(0, 0, 0, 0);
  //       to.setHours(23, 59, 59, 999);
  //       break;
  //     case "thisWeek":
  //       from.setDate(first);
  //       from.setHours(0, 0, 0, 0);
  //       to.setHours(23, 59, 59, 999);
  //       break;
  //     case "lastWeek":
  //       from.setDate(from.getDate() - 7 - from.getDay());
  //       to.setDate(to.getDate() - to.getDay() - 1);
  //       from.setHours(0, 0, 0, 0);
  //       to.setHours(23, 59, 59, 999);
  //       break;
  //     case "thisMonth":
  //       from.setDate(1);
  //       from.setHours(0, 0, 0, 0);
  //       to.setHours(23, 59, 59, 999);
  //       break;
  //     case "lastMonth":
  //       from.setMonth(from.getMonth() - 1);
  //       from.setDate(1);
  //       from.setHours(0, 0, 0, 0);
  //       to.setDate(0);
  //       to.setHours(23, 59, 59, 999);
  //       break;
  //   }

  //   return { from, to };
  // };

  // const setPreset = (preset: string): void => {
  //   const range = getPresetRange(preset);
  //   setRange(range);
  //   if (rangeCompare) {
  //     setRangeCompare({
  //       from: new Date(
  //         range.from.getFullYear() - 1,
  //         range.from.getMonth(),
  //         range.from.getDate()
  //       ),
  //       to: range.to
  //         ? new Date(
  //             range.to.getFullYear() - 1,
  //             range.to.getMonth(),
  //             range.to.getDate()
  //           )
  //         : undefined,
  //     });
  //   }
  // };

  // const checkPreset = (): void => {
  //   for (const preset of PRESETS) {
  //     const presetRange = getPresetRange(preset.name);
  //     const normRangeFrom = new Date(range.from).setHours(0, 0, 0, 0);
  //     const normRangeTo = new Date(range.to ?? 0).setHours(0, 0, 0, 0);
  //     const normPresetFrom = presetRange.from.setHours(0, 0, 0, 0);
  //     const normPresetTo = presetRange.to?.setHours(0, 0, 0, 0) ?? 0;

  //     if (normRangeFrom === normPresetFrom && normRangeTo === normPresetTo) {
  //       setSelectedPreset(preset.name);
  //       return;
  //     }
  //   }
  //   setSelectedPreset(undefined);
  // };

  const resetValues = (): void => {
    setRange({
      from: getDateAdjustedForTimezone(initialDateFrom),
      to: initialDateTo
        ? getDateAdjustedForTimezone(initialDateTo)
        : getDateAdjustedForTimezone(initialDateFrom),
    });
    setRangeCompare(
      initialCompareFrom
        ? {
            from: getDateAdjustedForTimezone(initialCompareFrom),
            to: initialCompareTo
              ? getDateAdjustedForTimezone(initialCompareTo)
              : getDateAdjustedForTimezone(initialCompareFrom),
          }
        : undefined
    );
  };

  const areRangesEqual = (a?: DateRange, b?: DateRange): boolean => {
    if (!a || !b) return a === b;
    return (
      a.from.getTime() === b.from.getTime() &&
      (!a.to || !b.to || a.to.getTime() === b.to.getTime())
    );
  };

  useEffect(() => {
    // checkPreset();
  }, [range]);

  useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range;
      openedRangeCompareRef.current = rangeCompare;
    }
  }, [isOpen]);

  const PresetButton = ({
    preset,
    label,
    isSelected,
  }: {
    preset: string;
    label: string;
    isSelected: boolean;
  }) => (
    <Button
      className={cn(isSelected && "pointer-events-none")}
      variant="ghost"
      // onClick={() => setPreset(preset)}
    >
      <>
        <span className={cn("pr-2 opacity-0", isSelected && "opacity-70")}>
          <CheckIcon width={18} height={18} />
        </span>
        {label}
      </>
    </Button>
  );

  return (
    <div className="border rounded-2xl flex items-center pr-2 ">
      <div className="flex gap-2">
        <DateInput
          value={range.from}
          onChange={(date) => {
            const toDate =
              range.to == null || date > range.to ? date : range.to;
            setRange((prevRange) => ({
              ...prevRange,
              from: date,
              to: toDate,
            }));
          }}
        />
        <div className="py-1">-</div>
        <DateInput
          value={range.to}
          onChange={(date) => {
            const fromDate = date < range.from ? date : range.from;
            setRange((prevRange) => ({
              ...prevRange,
              from: fromDate,
              to: date,
            }));
          }}
        />
      </div>
      <Calendar strokeWidth={1} size={20}></Calendar>
    </div>
  );
};

export const DateRangePicker = Object.assign(DateRangePickerComponent, {
  displayName: "DateRangePicker",
  filePath:
    "libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx",
});
