import * as React from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";

interface Option {
    value: string;
    label: string;
}

interface MultiSelectProps {
    options: Option[];
    value?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    disabled?: boolean;
    emptyMessage?: string;
}

export function MultiSelect({
    options,
    value = [],
    onChange,
    placeholder = "Select items...",
    searchPlaceholder = "Search items...",
    disabled = false,
    emptyMessage = "No items found.",
}: MultiSelectProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    className={cn(
                        "w-full justify-between",
                        !value?.length && "text-muted-foreground"
                    )}
                >
                    {value?.length > 0 ? (
                        <div className="flex gap-1 flex-wrap">
                            {value.map((selectedValue) => {
                                const option = options.find(
                                    (opt) => opt.value === selectedValue
                                );
                                return option ? (
                                    <Badge
                                        key={option.value}
                                        variant="secondary"
                                        className="mr-1"
                                    >
                                        {option.label}
                                        <div
                                            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    const newValue =
                                                        value.filter(
                                                            (id) =>
                                                                id !==
                                                                option.value
                                                        );
                                                    onChange?.(newValue);
                                                }
                                            }}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onClick={() => {
                                                const newValue = value.filter(
                                                    (id) => id !== option.value
                                                );
                                                onChange?.(newValue);
                                            }}
                                        >
                                            <X className="h-3 w-3" />
                                        </div>
                                    </Badge>
                                ) : null;
                            })}
                        </div>
                    ) : (
                        placeholder
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder={searchPlaceholder}
                        className="h-9"
                    />
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                        {options.map((option) => (
                            <CommandItem
                                value={option.label}
                                key={option.value}
                                onSelect={() => {
                                    const newValue = value || [];
                                    if (newValue.includes(option.value)) {
                                        onChange?.(
                                            newValue.filter(
                                                (id) => id !== option.value
                                            )
                                        );
                                    } else {
                                        onChange?.([...newValue, option.value]);
                                    }
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value.includes(option.value)
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
