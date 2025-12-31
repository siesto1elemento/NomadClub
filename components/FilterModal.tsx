import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

/* -------------------- TYPES -------------------- */

export type Filters = {
  budget?: { min: number; max: number };
  country?: string;
};

/* -------------------- CONSTANTS -------------------- */

const BUDGET_RANGES = [
  { label: '$0 – $1000', min: 0, max: 1000 },
  { label: '$1000 – $2000', min: 1000, max: 2000 },
  { label: '$2000 – $3000', min: 2000, max: 3000 },
  { label: '$3000 – $5000', min: 3000, max: 5000 },
];

const COUNTRIES = [
  'Any',
  'India',
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'Canada',
];

/* -------------------- PROPS -------------------- */

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
};

/* -------------------- COMPONENT -------------------- */

export default function FilterModal({
  visible,
  onClose,
  onApplyFilters,
}: FilterModalProps) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['80%'], []);
  const [filters, setFilters] = useState<Filters>({});

  if (!visible) return null;

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose
      onClose={onClose}
      handleIndicatorStyle={styles.dragHandle}
      backgroundStyle={styles.sheetBackground}
    >
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        <Text style={styles.modalTitle}>Filters</Text>

        {/* Budget */}
        <Text style={styles.sectionTitle}>Cost of Living</Text>
        <View style={styles.budgetContainer}>
          {BUDGET_RANGES.map(range => {
            const isSelected = filters.budget?.max === range.max;
            return (
              <TouchableOpacity
                key={range.label}
                onPress={() =>
                  setFilters(prev => ({ ...prev, budget: range }))
                }
                style={[
                  styles.budgetButton,
                  isSelected && styles.budgetButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.budgetButtonText,
                    isSelected && styles.budgetButtonTextSelected,
                  ]}
                >
                  {range.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Country */}
        <Text style={styles.sectionTitle}>Country</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {COUNTRIES.map(country => {
            const isSelected =
              filters.country === country ||
              (country === 'Any' && !filters.country);

            return (
              <TouchableOpacity
                key={country}
                onPress={() =>
                  setFilters(prev => ({
                    ...prev,
                    country: country === 'Any' ? undefined : country,
                  }))
                }
                style={[
                  styles.countryChip,
                  isSelected && styles.countryChipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.countryChipText,
                    isSelected && styles.countryChipTextSelected,
                  ]}
                >
                  {country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setFilters({})}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              onApplyFilters(filters);
              sheetRef.current?.close();
            }}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  sheetBackground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  dragHandle: {
    backgroundColor: '#94a3b8',
    width: 40,
  },

  content: {
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },

  budgetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  budgetButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
  },

  budgetButtonSelected: {
    backgroundColor: '#6366f1',
  },

  budgetButtonText: {
    color: '#334155',
  },

  budgetButtonTextSelected: {
    color: '#fff',
  },

  countryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 10,
  },

  countryChipSelected: {
    backgroundColor: '#0f172a',
  },

  countryChipText: {
    color: '#334155',
  },

  countryChipTextSelected: {
    color: '#fff',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },

  resetButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },

  applyButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#0f172a',
    alignItems: 'center',
  },

  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  resetButtonText: {
    fontWeight: '600',
  },
});
