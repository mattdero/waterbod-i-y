import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Modal,
} from 'react-native';

// Format number with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Calculator List Screen - Memoized
const CalculatorListScreen = memo(({ onNavigate }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Water Retention Calculators</Text>

      <TouchableOpacity 
        style={styles.calculatorCard}
        onPress={() => onNavigate('RainCatchment')}
      >
        <Text style={styles.calculatorTitle}>💧 Rain Catchment Calculator</Text>
        <Text style={styles.calculatorDescription}>
          Calculate rainwater collection from rectangular, triangular, and circular surfaces
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.calculatorCard}
        onPress={() => onNavigate('CisternSizing')}
      >
        <Text style={styles.calculatorTitle}>🏗️ Cistern Sizing Calculator</Text>
        <Text style={styles.calculatorDescription}>
          Determine cistern capacity needed for storm events and drought periods
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.calculatorCard}
        onPress={() => onNavigate('TankCapacity')}
      >
        <Text style={styles.calculatorTitle}>🛢️ Tank Capacity Calculator</Text>
        <Text style={styles.calculatorDescription}>
          Calculate storage capacity of cylindrical and rectangular tanks
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.calculatorCard}
        onPress={() => onNavigate('WaterPressure')}
      >
        <Text style={styles.calculatorTitle}>📊 Water Pressure Calculator</Text>
        <Text style={styles.calculatorDescription}>
          Calculate gravity-fed water pressure and weight of stored water
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.calculatorCard}
        onPress={() => onNavigate('EmbankmentCalculator')}
      >
        <Text style={styles.calculatorTitle}>🏔️ Embankment Calculator</Text>
        <Text style={styles.calculatorDescription}>
          Calculate embankment dimensions for water retention structures
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.calculatorCard}
        onPress={() => onNavigate('SlopeCalculator')}
      >
        <Text style={styles.calculatorTitle}>📐 Slope Calculator</Text>
        <Text style={styles.calculatorDescription}>
          Calculate slope percentage, angle, and ratio for land assessment
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.calculatorCard}
        onPress={() => onNavigate('SoilCalculator')}
      >
        <Text style={styles.calculatorTitle}>🌱 Soil Type Calculator</Text>
        <Text style={styles.calculatorDescription}>
          Determine your soil type from sand, silt, and clay percentages
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.calculatorCard}
        onPress={() => onNavigate('AcreFeetCalculator')}
      >
        <Text style={styles.calculatorTitle}>🏞️ Acre-Feet Calculator</Text>
        <Text style={styles.calculatorDescription}>
          Calculate water volume for ponds, reservoirs, and irrigation planning
        </Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
));

// Enhanced Rain Catchment Calculator Screen - Memoized
const RainCatchmentScreen = memo(({ 
  units, 
  catchmentShape,
  // Rectangular inputs
  roofLength, 
  roofWidth, 
  // Triangular inputs
  triangleBase,
  triangleHeight,
  triangleSideA,
  triangleSideB,
  triangleSideC,
  triangleMethod,
  // Circular inputs
  circleRadius,
  circleDiameter,
  circleInputMethod,
  // Common inputs
  rainfall, 
  runoffCoeff, 
  waterResult,
  onUnitsChange,
  onCatchmentShapeChange,
  onRoofLengthChange,
  onRoofWidthChange,
  onTriangleBaseChange,
  onTriangleHeightChange,
  onTriangleSideAChange,
  onTriangleSideBChange,
  onTriangleSideCChange,
  onTriangleMethodChange,
  onCircleRadiusChange,
  onCircleDiameterChange,
  onCircleInputMethodChange,
  onRainfallChange,
  onRunoffCoeffChange,
  onCalculate
}) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Rain Catchment Calculator</Text>
      
      <View style={styles.unitContainer}>
        <TouchableOpacity 
          style={[styles.unitButton, units === 'imperial' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('imperial')}
        >
          <Text style={[styles.unitButtonText, units === 'imperial' && styles.activeText]}>Imperial</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.unitButton, units === 'metric' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('metric')}
        >
          <Text style={[styles.unitButtonText, units === 'metric' && styles.activeText]}>Metric</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Catchment Shape</Text>
      <View style={styles.shapeContainer}>
        <TouchableOpacity 
          style={[styles.shapeButton, catchmentShape === 'rectangular' && styles.shapeButtonActive]}
          onPress={() => onCatchmentShapeChange('rectangular')}
        >
          <Text style={[styles.shapeButtonText, catchmentShape === 'rectangular' && styles.activeText]}>Rectangular</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.shapeButton, catchmentShape === 'triangular' && styles.shapeButtonActive]}
          onPress={() => onCatchmentShapeChange('triangular')}
        >
          <Text style={[styles.shapeButtonText, catchmentShape === 'triangular' && styles.activeText]}>Triangular</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.shapeButton, catchmentShape === 'circular' && styles.shapeButtonActive]}
          onPress={() => onCatchmentShapeChange('circular')}
        >
          <Text style={[styles.shapeButtonText, catchmentShape === 'circular' && styles.activeText]}>Circular</Text>
        </TouchableOpacity>
      </View>

      {/* Rectangular inputs */}
      {catchmentShape === 'rectangular' && (
        <>
          <Text style={styles.label}>Length</Text>
          <TextInput
            style={styles.input}
            value={roofLength}
            onChangeText={onRoofLengthChange}
            placeholder={`Enter length in ${units === 'imperial' ? 'feet' : 'meters'}`}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Width</Text>
          <TextInput
            style={styles.input}
            value={roofWidth}
            onChangeText={onRoofWidthChange}
            placeholder={`Enter width in ${units === 'imperial' ? 'feet' : 'meters'}`}
            keyboardType="numeric"
          />
        </>
      )}

      {/* Triangular inputs */}
      {catchmentShape === 'triangular' && (
        <>
          <Text style={styles.label}>Calculation Method</Text>
          <View style={styles.methodContainer}>
            <TouchableOpacity 
              style={[styles.methodButton, triangleMethod === 'baseHeight' && styles.methodButtonActive]}
              onPress={() => onTriangleMethodChange('baseHeight')}
            >
              <Text style={[styles.methodButtonText, triangleMethod === 'baseHeight' && styles.activeText]}>Base × Height</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.methodButton, triangleMethod === 'threeSides' && styles.methodButtonActive]}
              onPress={() => onTriangleMethodChange('threeSides')}
            >
              <Text style={[styles.methodButtonText, triangleMethod === 'threeSides' && styles.activeText]}>Three Sides</Text>
            </TouchableOpacity>
          </View>

          {triangleMethod === 'baseHeight' ? (
            <>
              <Text style={styles.label}>Base</Text>
              <TextInput
                style={styles.input}
                value={triangleBase}
                onChangeText={onTriangleBaseChange}
                placeholder={`Base in ${units === 'imperial' ? 'feet' : 'meters'}`}
                keyboardType="numeric"
              />
              
              <Text style={styles.label}>Height (perpendicular to base)</Text>
              <TextInput
                style={styles.input}
                value={triangleHeight}
                onChangeText={onTriangleHeightChange}
                placeholder={`Height in ${units === 'imperial' ? 'feet' : 'meters'}`}
                keyboardType="numeric"
              />
            </>
          ) : (
            <>
              <Text style={styles.label}>Side A</Text>
              <TextInput
                style={styles.input}
                value={triangleSideA}
                onChangeText={onTriangleSideAChange}
                placeholder={`Side A in ${units === 'imperial' ? 'feet' : 'meters'}`}
                keyboardType="numeric"
              />
              
              <Text style={styles.label}>Side B</Text>
              <TextInput
                style={styles.input}
                value={triangleSideB}
                onChangeText={onTriangleSideBChange}
                placeholder={`Side B in ${units === 'imperial' ? 'feet' : 'meters'}`}
                keyboardType="numeric"
              />
              
              <Text style={styles.label}>Side C</Text>
              <TextInput
                style={styles.input}
                value={triangleSideC}
                onChangeText={onTriangleSideCChange}
                placeholder={`Side C in ${units === 'imperial' ? 'feet' : 'meters'}`}
                keyboardType="numeric"
              />
            </>
          )}
        </>
      )}

      {/* Circular inputs */}
      {catchmentShape === 'circular' && (
        <>
          <Text style={styles.label}>Input Method</Text>
          <View style={styles.methodContainer}>
            <TouchableOpacity 
              style={[styles.methodButton, circleInputMethod === 'radius' && styles.methodButtonActive]}
              onPress={() => onCircleInputMethodChange('radius')}
            >
              <Text style={[styles.methodButtonText, circleInputMethod === 'radius' && styles.activeText]}>Radius</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.methodButton, circleInputMethod === 'diameter' && styles.methodButtonActive]}
              onPress={() => onCircleInputMethodChange('diameter')}
            >
              <Text style={[styles.methodButtonText, circleInputMethod === 'diameter' && styles.activeText]}>Diameter</Text>
            </TouchableOpacity>
          </View>

          {circleInputMethod === 'radius' ? (
            <>
              <Text style={styles.label}>Radius</Text>
              <TextInput
                style={styles.input}
                value={circleRadius}
                onChangeText={onCircleRadiusChange}
                placeholder={`Radius in ${units === 'imperial' ? 'feet' : 'meters'}`}
                keyboardType="numeric"
              />
            </>
          ) : (
            <>
              <Text style={styles.label}>Diameter</Text>
              <TextInput
                style={styles.input}
                value={circleDiameter}
                onChangeText={onCircleDiameterChange}
                placeholder={`Diameter in ${units === 'imperial' ? 'feet' : 'meters'}`}
                keyboardType="numeric"
              />
            </>
          )}
        </>
      )}
      
      <Text style={styles.label}>Rainfall</Text>
      <TextInput
        style={styles.input}
        value={rainfall}
        onChangeText={onRainfallChange}
        placeholder={`Enter rainfall in ${units === 'imperial' ? 'inches' : 'mm'}`}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Runoff Coefficient</Text>
      <TextInput
        style={styles.input}
        value={runoffCoeff}
        onChangeText={onRunoffCoeffChange}
        placeholder="0.8 for roofs"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={onCalculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
      
      {waterResult && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            Area: {waterResult.area} {units === 'imperial' ? 'sq ft' : 'sq m'}
          </Text>
          <Text style={styles.resultText}>
            Maximum Water: {waterResult.maxAmount} {units === 'imperial' ? 'gallons' : 'liters'}
          </Text>
          <Text style={styles.resultText}>
            Net Water: {waterResult.netAmount} {units === 'imperial' ? 'gallons' : 'liters'}
          </Text>
        </View>
      )}

      <View style={styles.guide}>
        <Text style={styles.guideTitle}>Enhanced Runoff Coefficient Reference:</Text>
        <Text style={styles.guideSectionTitle}>Roofs & Impervious Surfaces:</Text>
        <Text style={styles.guideText}>• Metal/Pitched Roofs: 0.95 (5% loss)</Text>
        <Text style={styles.guideText}>• Concrete/Asphalt Roofs: 0.90 (10% loss)</Text>
        <Text style={styles.guideText}>• Built-up Tar & Gravel: 0.80-0.85 (15-20% loss)</Text>
        <Text style={styles.guideText}>• Concrete/Asphalt Pavement: 0.70-0.90</Text>
        <Text style={styles.guideText}>• Gravel Surface: 0.40-0.60</Text>
        
        <Text style={styles.guideSectionTitle}>Pervious Surfaces (Southwestern US):</Text>
        <Text style={styles.guideText}>• Sonoran Desert (healthy): 0.30-0.50</Text>
        <Text style={styles.guideText}>• Bare Earth: 0.35-0.55</Text>
        <Text style={styles.guideText}>• Grass/Lawn: 0.10-0.25</Text>
        <Text style={styles.guideText}>• Forest/Woods: 0.10-0.30</Text>
        
        <Text style={styles.guideNote}>Note: Runoff varies with rainfall intensity and duration. Light rainfall may not produce any runoff.</Text>
      </View>
      
      {/* Bottom spacing for screen buttons */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  </SafeAreaView>
));

// Cistern Sizing Calculator Screen - Memoized
const CisternSizingScreen = memo(({
  units,
  cisternCalcType,
  // Storm event inputs
  catchmentArea,
  stormRainfall,
  stormRunoffCoeff,
  stormResult,
  // Drought period inputs
  numPeople,
  dailyConsumption,
  droughtDays,
  droughtResult,
  onUnitsChange,
  onCisternCalcTypeChange,
  onCatchmentAreaChange,
  onStormRainfallChange,
  onStormRunoffCoeffChange,
  onNumPeopleChange,
  onDailyConsumptionChange,
  onDroughtDaysChange,
  onCalculateStorm,
  onCalculateDrought
}) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Cistern Sizing Calculator</Text>
      
      <View style={styles.unitContainer}>
        <TouchableOpacity 
          style={[styles.unitButton, units === 'imperial' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('imperial')}
        >
          <Text style={[styles.unitButtonText, units === 'imperial' && styles.activeText]}>Imperial</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.unitButton, units === 'metric' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('metric')}
        >
          <Text style={[styles.unitButtonText, units === 'metric' && styles.activeText]}>Metric</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Calculation Type</Text>
      <View style={styles.methodContainer}>
        <TouchableOpacity 
          style={[styles.methodButton, cisternCalcType === 'storm' && styles.methodButtonActive]}
          onPress={() => onCisternCalcTypeChange('storm')}
        >
          <Text style={[styles.methodButtonText, cisternCalcType === 'storm' && styles.activeText]}>Storm Event</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.methodButton, cisternCalcType === 'drought' && styles.methodButtonActive]}
          onPress={() => onCisternCalcTypeChange('drought')}
        >
          <Text style={[styles.methodButtonText, cisternCalcType === 'drought' && styles.activeText]}>Drought Period</Text>
        </TouchableOpacity>
      </View>

      {cisternCalcType === 'storm' ? (
        <>
          <Text style={styles.formula}>
            Formula: Catchment Area × Storm Rainfall × 7.48 gal/ft³ × Runoff Coefficient
          </Text>
          
          <Text style={styles.label}>Catchment Area</Text>
          <TextInput
            style={styles.input}
            value={catchmentArea}
            onChangeText={onCatchmentAreaChange}
            placeholder={`Area in ${units === 'imperial' ? 'sq ft' : 'sq m'}`}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Storm Rainfall</Text>
          <TextInput
            style={styles.input}
            value={stormRainfall}
            onChangeText={onStormRainfallChange}
            placeholder={`Rainfall in ${units === 'imperial' ? 'inches' : 'mm'}`}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Runoff Coefficient</Text>
          <TextInput
            style={styles.input}
            value={stormRunoffCoeff}
            onChangeText={onStormRunoffCoeffChange}
            placeholder="0.8 for roofs"
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={styles.button} onPress={onCalculateStorm}>
            <Text style={styles.buttonText}>Calculate Storm Cistern Size</Text>
          </TouchableOpacity>
          
          {stormResult && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Minimum Cistern Capacity: {stormResult} {units === 'imperial' ? 'gallons' : 'liters'}
              </Text>
            </View>
          )}

          <View style={styles.guide}>
            <Text style={styles.guideTitle}>Storm Event Sizing:</Text>
            <Text style={styles.guideText}>This calculates the minimum cistern size needed to capture runoff from a large storm event without overflow loss.</Text>
            <Text style={styles.guideText}>Consider local storm patterns - some areas may receive 3+ inches in a single event.</Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.formula}>
            Formula: People × Daily Consumption × Drought Days = Storage Needed
          </Text>
          
          <Text style={styles.label}>Number of People</Text>
          <TextInput
            style={styles.input}
            value={numPeople}
            onChangeText={onNumPeopleChange}
            placeholder="Number of household members"
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Daily Water Consumption per Person</Text>
          <TextInput
            style={styles.input}
            value={dailyConsumption}
            onChangeText={onDailyConsumptionChange}
            placeholder={`${units === 'imperial' ? 'Gallons' : 'Liters'} per person per day`}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Longest Drought Period</Text>
          <TextInput
            style={styles.input}
            value={droughtDays}
            onChangeText={onDroughtDaysChange}
            placeholder="Days without rain"
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={styles.button} onPress={onCalculateDrought}>
            <Text style={styles.buttonText}>Calculate Drought Storage</Text>
          </TouchableOpacity>
          
          {droughtResult && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Storage Capacity Needed: {droughtResult} {units === 'imperial' ? 'gallons' : 'liters'}
              </Text>
            </View>
          )}

          <View style={styles.guide}>
            <Text style={styles.guideTitle}>Drought Period Sizing:</Text>
            <Text style={styles.guideText}>This calculates storage needed for households using rainwater as their primary source.</Text>
            <Text style={styles.guideText}>Typical consumption: 50 gal/person/day (standard) or 20 gal/person/day (conservation)</Text>
            <Text style={styles.guideText}>Reduce consumption to make storage more feasible.</Text>
          </View>
        </>
      )}
      
      {/* Bottom spacing for screen buttons */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  </SafeAreaView>
));

// Tank Capacity Calculator Screen - Memoized
const TankCapacityScreen = memo(({
  units,
  tankShape,
  // Cylindrical inputs
  cylinderRadius,
  cylinderDiameter,
  cylinderInputMethod,
  cylinderHeight,
  cylinderEffectiveHeight,
  cylinderResult,
  // Rectangular inputs
  rectLength,
  rectWidth,
  rectHeight,
  rectEffectiveHeight,
  rectResult,
  onUnitsChange,
  onTankShapeChange,
  onCylinderRadiusChange,
  onCylinderDiameterChange,
  onCylinderInputMethodChange,
  onCylinderHeightChange,
  onCylinderEffectiveHeightChange,
  onRectLengthChange,
  onRectWidthChange,
  onRectHeightChange,
  onRectEffectiveHeightChange,
  onCalculateCylinder,
  onCalculateRect
}) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Tank Capacity Calculator</Text>
      
      <View style={styles.unitContainer}>
        <TouchableOpacity 
          style={[styles.unitButton, units === 'imperial' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('imperial')}
        >
          <Text style={[styles.unitButtonText, units === 'imperial' && styles.activeText]}>Imperial</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.unitButton, units === 'metric' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('metric')}
        >
          <Text style={[styles.unitButtonText, units === 'metric' && styles.activeText]}>Metric</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Tank Shape</Text>
      <View style={styles.methodContainer}>
        <TouchableOpacity 
          style={[styles.methodButton, tankShape === 'cylindrical' && styles.methodButtonActive]}
          onPress={() => onTankShapeChange('cylindrical')}
        >
          <Text style={[styles.methodButtonText, tankShape === 'cylindrical' && styles.activeText]}>Cylindrical</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.methodButton, tankShape === 'rectangular' && styles.methodButtonActive]}
          onPress={() => onTankShapeChange('rectangular')}
        >
          <Text style={[styles.methodButtonText, tankShape === 'rectangular' && styles.activeText]}>Rectangular</Text>
        </TouchableOpacity>
      </View>

      {tankShape === 'cylindrical' ? (
        <>
          <Text style={styles.formula}>
            Formula: π × radius² × effective height × 7.48 gal/ft³
          </Text>
          
          <Text style={styles.label}>Input Method</Text>
          <View style={styles.methodContainer}>
            <TouchableOpacity 
              style={[styles.methodButton, cylinderInputMethod === 'radius' && styles.methodButtonActive]}
              onPress={() => onCylinderInputMethodChange('radius')}
            >
              <Text style={[styles.methodButtonText, cylinderInputMethod === 'radius' && styles.activeText]}>Radius</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.methodButton, cylinderInputMethod === 'diameter' && styles.methodButtonActive]}
              onPress={() => onCylinderInputMethodChange('diameter')}
            >
              <Text style={[styles.methodButtonText, cylinderInputMethod === 'diameter' && styles.activeText]}>Diameter</Text>
            </TouchableOpacity>
          </View>

          {cylinderInputMethod === 'radius' ? (
            <>
              <Text style={styles.label}>Radius</Text>
              <TextInput
                style={styles.input}
                value={cylinderRadius}
                onChangeText={onCylinderRadiusChange}
                placeholder={`Radius in ${units === 'imperial' ? 'feet' : 'meters'}`}
                keyboardType="numeric"
              />
            </>
          ) : (
            <>
              <Text style={styles.label}>Diameter</Text>
              <TextInput
                style={styles.input}
                value={cylinderDiameter}
                onChangeText={onCylinderDiameterChange}
                placeholder={`Diameter in ${units === 'imperial' ? 'feet' : 'meters'}`}
                keyboardType="numeric"
              />
            </>
          )}
          
          <Text style={styles.label}>Total Height</Text>
          <TextInput
            style={styles.input}
            value={cylinderHeight}
            onChangeText={onCylinderHeightChange}
            placeholder={`Height in ${units === 'imperial' ? 'feet' : 'meters'}`}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Effective Height (usable water height)</Text>
          <TextInput
            style={styles.input}
            value={cylinderEffectiveHeight}
            onChangeText={onCylinderEffectiveHeightChange}
            placeholder={`Effective height in ${units === 'imperial' ? 'feet' : 'meters'}`}
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={styles.button} onPress={onCalculateCylinder}>
            <Text style={styles.buttonText}>Calculate Cylinder Capacity</Text>
          </TouchableOpacity>
          
          {cylinderResult && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Tank Capacity: {cylinderResult} {units === 'imperial' ? 'gallons' : 'liters'}
              </Text>
            </View>
          )}
        </>
      ) : (
        <>
          <Text style={styles.formula}>
            Formula: Length × Width × Effective Height × 7.48 gal/ft³
          </Text>
          
          <Text style={styles.label}>Length</Text>
          <TextInput
            style={styles.input}
            value={rectLength}
            onChangeText={onRectLengthChange}
            placeholder={`Length in ${units === 'imperial' ? 'feet' : 'meters'}`}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Width</Text>
          <TextInput
            style={styles.input}
            value={rectWidth}
            onChangeText={onRectWidthChange}
            placeholder={`Width in ${units === 'imperial' ? 'feet' : 'meters'}`}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Total Height</Text>
          <TextInput
            style={styles.input}
            value={rectHeight}
            onChangeText={onRectHeightChange}
            placeholder={`Height in ${units === 'imperial' ? 'feet' : 'meters'}`}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Effective Height (usable water height)</Text>
          <TextInput
            style={styles.input}
            value={rectEffectiveHeight}
            onChangeText={onRectEffectiveHeightChange}
            placeholder={`Effective height in ${units === 'imperial' ? 'feet' : 'meters'}`}
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={styles.button} onPress={onCalculateRect}>
            <Text style={styles.buttonText}>Calculate Rectangular Capacity</Text>
          </TouchableOpacity>
          
          {rectResult && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Tank Capacity: {rectResult} {units === 'imperial' ? 'gallons' : 'liters'}
              </Text>
            </View>
          )}
        </>
      )}

      <View style={styles.guide}>
        <Text style={styles.guideTitle}>Effective Height Notes:</Text>
        <Text style={styles.guideText}>• Subtract outlet pipe height from bottom (typically 4-6 inches)</Text>
        <Text style={styles.guideText}>• Subtract overflow pipe depth from top (typically 4-6 inches)</Text>
        <Text style={styles.guideText}>• Example: 8 ft tank - 4 in outlet - 5 in overflow = 7.25 ft effective</Text>
      </View>
      
      {/* Bottom spacing for screen buttons */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  </SafeAreaView>
));

// Water Pressure Calculator Screen - Memoized
const WaterPressureScreen = memo(({
  units,
  pressureCalcType,
  // Pressure inputs
  waterHeight,
  pressureResult,
  // Weight inputs
  waterVolume,
  weightResult,
  onUnitsChange,
  onPressureCalcTypeChange,
  onWaterHeightChange,
  onWaterVolumeChange,
  onCalculatePressure,
  onCalculateWeight
}) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Water Pressure & Weight Calculator</Text>
      
      <View style={styles.unitContainer}>
        <TouchableOpacity 
          style={[styles.unitButton, units === 'imperial' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('imperial')}
        >
          <Text style={[styles.unitButtonText, units === 'imperial' && styles.activeText]}>Imperial</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.unitButton, units === 'metric' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('metric')}
        >
          <Text style={[styles.unitButtonText, units === 'metric' && styles.activeText]}>Metric</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Calculation Type</Text>
      <View style={styles.methodContainer}>
        <TouchableOpacity 
          style={[styles.methodButton, pressureCalcType === 'pressure' && styles.methodButtonActive]}
          onPress={() => onPressureCalcTypeChange('pressure')}
        >
          <Text style={[styles.methodButtonText, pressureCalcType === 'pressure' && styles.activeText]}>Water Pressure</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.methodButton, pressureCalcType === 'weight' && styles.methodButtonActive]}
          onPress={() => onPressureCalcTypeChange('weight')}
        >
          <Text style={[styles.methodButtonText, pressureCalcType === 'weight' && styles.activeText]}>Water Weight</Text>
        </TouchableOpacity>
      </View>

      {pressureCalcType === 'pressure' ? (
        <>
          <Text style={styles.formula}>
            Formula: Height × 0.43 psi/ft = Gravity-Fed Pressure
          </Text>
          
          <Text style={styles.label}>Height of Water Above Destination</Text>
          <TextInput
            style={styles.input}
            value={waterHeight}
            onChangeText={onWaterHeightChange}
            placeholder={`Height in ${units === 'imperial' ? 'feet' : 'meters'}`}
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={styles.button} onPress={onCalculatePressure}>
            <Text style={styles.buttonText}>Calculate Water Pressure</Text>
          </TouchableOpacity>
          
          {pressureResult && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Gravity-Fed Pressure: {pressureResult} {units === 'imperial' ? 'psi' : 'kPa'}
              </Text>
            </View>
          )}

          <View style={styles.guide}>
            <Text style={styles.guideTitle}>Water Pressure Guidelines:</Text>
            <Text style={styles.guideText}>• 1 psi minimum for basic irrigation</Text>
            <Text style={styles.guideText}>• 2.5 ft height = 1 psi (minimum recommended)</Text>
            <Text style={styles.guideText}>• Pressure decreases as tank empties</Text>
            <Text style={styles.guideText}>• Longer hoses reduce pressure due to friction</Text>
            <Text style={styles.guideText}>• Place tanks close to usage points for better pressure</Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.formula}>
            Formula: Volume × {units === 'imperial' ? '8.34 lb/gal' : '1 kg/L'} = Water Weight
          </Text>
          
          <Text style={styles.label}>Volume of Stored Water</Text>
          <TextInput
            style={styles.input}
            value={waterVolume}
            onChangeText={onWaterVolumeChange}
            placeholder={`Volume in ${units === 'imperial' ? 'gallons' : 'liters'}`}
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={styles.button} onPress={onCalculateWeight}>
            <Text style={styles.buttonText}>Calculate Water Weight</Text>
          </TouchableOpacity>
          
          {weightResult && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Water Weight: {weightResult} {units === 'imperial' ? 'pounds' : 'kilograms'}
              </Text>
            </View>
          )}

          <View style={styles.guide}>
            <Text style={styles.guideTitle}>Water Weight Guidelines:</Text>
            <Text style={styles.guideText}>• Water is extremely heavy - plan platforms accordingly</Text>
            <Text style={styles.guideText}>• 55-gallon drum = ~459 pounds when full</Text>
            <Text style={styles.guideText}>• 1000-gallon tank = ~8,340 pounds when full</Text>
            <Text style={styles.guideText}>• Ensure foundations can support the total weight</Text>
            <Text style={styles.guideText}>• Consider weight distribution over the support area</Text>
          </View>
        </>
      )}
      
      {/* Bottom spacing for screen buttons */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  </SafeAreaView>
));

// Embankment Calculator Screen - Memoized
const EmbankmentCalculatorScreen = memo(({
  units,
  waterDepth,
  keyWidth,
  freeboardWidth,
  slopeRatio,
  embankmentResult,
  onUnitsChange,
  onWaterDepthChange,
  onKeyWidthChange,
  onFreeboardWidthChange,
  onSlopeRatioChange,
  onCalculate
}) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Embankment Calculator</Text>
      
      <View style={styles.unitContainer}>
        <TouchableOpacity 
          style={[styles.unitButton, units === 'imperial' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('imperial')}
        >
          <Text style={[styles.unitButtonText, units === 'imperial' && styles.activeText]}>Imperial</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.unitButton, units === 'metric' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('metric')}
        >
          <Text style={[styles.unitButtonText, units === 'metric' && styles.activeText]}>Metric</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.formula}>
        Formulas: Bottom of Key to Top of Freeboard = Depth + 2 | Distance from Deep Zone to Center of Key = Slope Ratio × (Depth + 1 + Key Width/Slope Ratio)
      </Text>
      
      <Text style={styles.label}>Depth of Water Body</Text>
      <TextInput
        style={styles.input}
        value={waterDepth}
        onChangeText={onWaterDepthChange}
        placeholder={`Water depth in ${units === 'imperial' ? 'feet' : 'meters'}`}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Width of Key</Text>
      <TextInput
        style={styles.input}
        value={keyWidth}
        onChangeText={onKeyWidthChange}
        placeholder={`Key width in ${units === 'imperial' ? 'feet' : 'meters'}`}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Width of Freeboard</Text>
      <TextInput
        style={styles.input}
        value={freeboardWidth}
        onChangeText={onFreeboardWidthChange}
        placeholder={`Freeboard width in ${units === 'imperial' ? 'feet' : 'meters'}`}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Slope Ratio (horizontal:vertical)</Text>
      <TextInput
        style={styles.input}
        value={slopeRatio}
        onChangeText={onSlopeRatioChange}
        placeholder="Enter slope ratio (e.g., 2 for 2:1 slope)"
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button} onPress={onCalculate}>
        <Text style={styles.buttonText}>Calculate Embankment</Text>
      </TouchableOpacity>
      
      {embankmentResult && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            Bottom of Key to Top of Freeboard: {embankmentResult.keyToFreeboard} {units === 'imperial' ? 'ft' : 'm'}
          </Text>
          <Text style={styles.resultText}>
            Distance from Deep Zone to Center of Key: {embankmentResult.centerDistance} {units === 'imperial' ? 'ft' : 'm'}
          </Text>
        </View>
      )}

      <View style={styles.guide}>
        <Text style={styles.guideTitle}>Embankment Design Guidelines:</Text>
        <Text style={styles.guideSectionTitle}>Key Components:</Text>
        <Text style={styles.guideText}>• Key: Foundation trench preventing seepage under embankment</Text>
        <Text style={styles.guideText}>• Freeboard: Safety margin above maximum water level</Text>
        <Text style={styles.guideText}>• Distance from Deep Zone: From deep zone to key centerline</Text>
        
        <Text style={styles.guideSectionTitle}>Slope Ratio Guidelines:</Text>
        <Text style={styles.guideText}>• 2:1 (2 horizontal : 1 vertical) - Standard stable slope</Text>
        <Text style={styles.guideText}>• 3:1 - More conservative, better for weak soils</Text>
        <Text style={styles.guideText}>• 1.5:1 - Steeper slope, requires good soil conditions</Text>
        <Text style={styles.guideText}>• Consider soil type and local regulations</Text>
        
        <Text style={styles.guideSectionTitle}>Design Considerations:</Text>
        <Text style={styles.guideText}>• Key depth is typically 1 meter lower than bottom of deep zone</Text>
        <Text style={styles.guideText}>• Freeboard prevents overtopping during storms</Text>
        <Text style={styles.guideText}>• Wider keys provide better seepage control</Text>
        <Text style={styles.guideText}>• Consider soil type for embankment stability</Text>
        
        <Text style={styles.guideSectionTitle}>Construction Tips:</Text>
        <Text style={styles.guideText}>• Compact fill material in lifts</Text>
        <Text style={styles.guideText}>• Use clay core for better water retention</Text>
        <Text style={styles.guideText}>• Establish vegetation for erosion control</Text>
        <Text style={styles.guideText}>• Install spillway for overflow management</Text>
      </View>
      
      {/* Bottom spacing for screen buttons */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  </SafeAreaView>
));

// Slope Calculator Screen - Memoized (unchanged)
const SlopeCalculatorScreen = memo(({ 
  rise, 
  run, 
  slopeResult,
  onRiseChange,
  onRunChange,
  onCalculate
}) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Slope Calculator</Text>
      
      <Text style={styles.label}>Rise</Text>
      <TextInput
        style={styles.input}
        value={rise}
        onChangeText={onRiseChange}
        placeholder="Vertical distance"
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Run</Text>
      <TextInput
        style={styles.input}
        value={run}
        onChangeText={onRunChange}
        placeholder="Horizontal distance"
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button} onPress={onCalculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
      
      {slopeResult && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Slope: {slopeResult.percent}%</Text>
          <Text style={styles.resultText}>Angle: {slopeResult.degrees}°</Text>
          <Text style={styles.resultText}>Ratio: {slopeResult.ratio}</Text>
        </View>
      )}

      <View style={styles.guide}>
        <Text style={styles.guideTitle}>Slope Guidelines:</Text>
        <Text style={styles.guideText}>• 0-2%: Minimal drainage, may pool water</Text>
        <Text style={styles.guideText}>• 2-5%: Good for rain gardens, swales</Text>
        <Text style={styles.guideText}>• 5-15%: Moderate erosion risk</Text>
        <Text style={styles.guideText}>• 15%+: High erosion risk, needs terracing</Text>
      </View>
      
      {/* Bottom spacing for screen buttons */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  </SafeAreaView>
));

// Soil Calculator Screen - Memoized (unchanged)
const SoilCalculatorScreen = memo(({ 
  sand, 
  silt, 
  clay, 
  soilType,
  onSandChange,
  onSiltChange,
  onClayChange,
  onCalculate
}) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Soil Type Calculator</Text>
      
      <Text style={styles.label}>Sand %</Text>
      <TextInput
        style={styles.input}
        value={sand}
        onChangeText={onSandChange}
        placeholder="Enter sand percentage"
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Silt %</Text>
      <TextInput
        style={styles.input}
        value={silt}
        onChangeText={onSiltChange}
        placeholder="Enter silt percentage"
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Clay %</Text>
      <TextInput
        style={styles.input}
        value={clay}
        onChangeText={onClayChange}
        placeholder="Enter clay percentage"
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button} onPress={onCalculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
      
      {soilType && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Soil Type: {soilType}</Text>
        </View>
      )}

      <View style={styles.guide}>
        <Text style={styles.guideTitle}>USDA Soil Texture Classifications:</Text>
        <Text style={styles.guideSectionTitle}>Sandy Soils:</Text>
        <Text style={styles.guideText}>• Sand: >85% sand, well-draining, low water retention</Text>
        <Text style={styles.guideText}>• Loamy Sand: 70-91% sand, moderate drainage</Text>
        <Text style={styles.guideText}>• Sandy Loam: Good drainage with some water retention</Text>
        
        <Text style={styles.guideSectionTitle}>Loamy Soils:</Text>
        <Text style={styles.guideText}>• Loam: Ideal garden soil, balanced drainage and retention</Text>
        <Text style={styles.guideText}>• Silt Loam: High water retention, can be slow-draining</Text>
        
        <Text style={styles.guideSectionTitle}>Clay Soils:</Text>
        <Text style={styles.guideText}>• Clay: >40% clay, very high water retention, poor drainage</Text>
        <Text style={styles.guideText}>• Clay Loam: Good water retention with moderate drainage</Text>
        <Text style={styles.guideText}>• Sandy Clay: High retention but better drainage than clay</Text>
        <Text style={styles.guideText}>• Silty Clay: High retention, prone to compaction</Text>
        
        <Text style={styles.guideSectionTitle}>Water Retention Tips:</Text>
        <Text style={styles.guideText}>• Sandy soils: Add organic matter, use mulch heavily</Text>
        <Text style={styles.guideText}>• Clay soils: Improve drainage, avoid compaction, add compost</Text>
        <Text style={styles.guideText}>• Loamy soils: Maintain with organic matter and mulch</Text>
        <Text style={styles.guideText}>• Silt soils: Prevent erosion, improve structure with organics</Text>
      </View>
      
      {/* Bottom spacing for screen buttons */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  </SafeAreaView>
));

// Acre-Feet Calculator Screen - Memoized (unchanged)
const AcreFeetCalculatorScreen = memo(({ 
  areaInput, 
  depthInput, 
  acreFeetUnits, 
  acreFeetResult,
  onAreaChange,
  onDepthChange,
  onUnitsChange,
  onCalculate
}) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Acre-Feet Calculator</Text>
      
      <View style={styles.unitContainer}>
        <TouchableOpacity 
          style={[styles.unitButton, acreFeetUnits === 'imperial' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('imperial')}
        >
          <Text style={[styles.unitButtonText, acreFeetUnits === 'imperial' && styles.activeText]}>Imperial</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.unitButton, acreFeetUnits === 'metric' && styles.unitButtonActive]}
          onPress={() => onUnitsChange('metric')}
        >
          <Text style={[styles.unitButtonText, acreFeetUnits === 'metric' && styles.activeText]}>Metric</Text>
        </TouchableOpacity>
      </View>

      {acreFeetUnits === 'imperial' ? (
        <>
          <Text style={styles.formula}>Formula: Area (acres) × Depth (feet) = Acre-feet</Text>
          
          <Text style={styles.label}>Area (acres)</Text>
          <TextInput
            style={styles.input}
            value={areaInput}
            onChangeText={onAreaChange}
            placeholder="Enter area in acres"
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Depth (feet)</Text>
          <TextInput
            style={styles.input}
            value={depthInput}
            onChangeText={onDepthChange}
            placeholder="Enter average depth in feet"
            keyboardType="numeric"
          />
        </>
      ) : (
        <>
          <Text style={styles.formula}>Formula: Area (hectares) × Depth (meters) = Hectare-meters</Text>
          
          <Text style={styles.label}>Area (hectares)</Text>
          <TextInput
            style={styles.input}
            value={areaInput}
            onChangeText={onAreaChange}
            placeholder="Enter area in hectares"
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Depth (meters)</Text>
          <TextInput
            style={styles.input}
            value={depthInput}
            onChangeText={onDepthChange}
            placeholder="Enter average depth in meters"
            keyboardType="numeric"
          />
        </>
      )}
      
      <TouchableOpacity style={styles.button} onPress={onCalculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
      
      {acreFeetResult && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Volume: {acreFeetResult.acreFeet} acre-feet</Text>
          <Text style={styles.resultText}>Gallons: {acreFeetResult.gallons}</Text>
          <Text style={styles.resultText}>Liters: {acreFeetResult.liters}</Text>
        </View>
      )}

      <View style={styles.guide}>
        <Text style={styles.guideTitle}>Reference:</Text>
        <Text style={styles.guideText}>• 1 acre-foot = 325,851 gallons</Text>
        <Text style={styles.guideText}>• 1 hectare-meter = 2.47 acre-feet</Text>
        <Text style={styles.guideText}>• 1 acre-foot = 1,233,482 liters</Text>
      </View>
      
      {/* Bottom spacing for screen buttons */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  </SafeAreaView>
));

// Shared Values Modal Component
const SharedValuesModal = memo(({ visible, sharedCalculations, onClose, onUseValue, currentScreen }) => {
  const getApplicableSetters = (currentScreen) => {
    const setters = [];
    
    switch (currentScreen) {
      case 'RainCatchment':
        setters.push(
          { label: 'Length', setter: 'setRoofLength', applicable: ['area', 'length', 'width', 'dimension'] },
          { label: 'Width', setter: 'setRoofWidth', applicable: ['area', 'length', 'width', 'dimension'] },
          { label: 'Rainfall', setter: 'setRainfall', applicable: ['rainfall', 'depth', 'height'] },
          { label: 'Runoff Coefficient', setter: 'setRunoffCoeff', applicable: ['coefficient', 'factor'] }
        );
        break;
      case 'CisternSizing':
        setters.push(
          { label: 'Catchment Area', setter: 'setCatchmentArea', applicable: ['area', 'catchment'] },
          { label: 'Storm Rainfall', setter: 'setStormRainfall', applicable: ['rainfall', 'depth', 'height'] },
          { label: 'People', setter: 'setNumPeople', applicable: ['people', 'persons', 'users'] },
          { label: 'Daily Consumption', setter: 'setDailyConsumption', applicable: ['consumption', 'usage', 'gallons', 'liters', 'volume'] }
        );
        break;
      case 'TankCapacity':
        setters.push(
          { label: 'Radius', setter: 'setCylinderRadius', applicable: ['radius', 'dimension'] },
          { label: 'Diameter', setter: 'setCylinderDiameter', applicable: ['diameter', 'dimension'] },
          { label: 'Height', setter: 'setCylinderHeight', applicable: ['height', 'depth', 'dimension'] },
          { label: 'Length', setter: 'setRectLength', applicable: ['length', 'dimension'] },
          { label: 'Width', setter: 'setRectWidth', applicable: ['width', 'dimension'] }
        );
        break;
      case 'WaterPressure':
        setters.push(
          { label: 'Water Height', setter: 'setWaterHeight', applicable: ['height', 'depth', 'dimension'] },
          { label: 'Water Volume', setter: 'setWaterVolume', applicable: ['volume', 'gallons', 'liters', 'capacity'] }
        );
        break;
      case 'EmbankmentCalculator':
        setters.push(
          { label: 'Water Depth', setter: 'setWaterDepth', applicable: ['depth', 'height', 'dimension'] },
          { label: 'Key Width', setter: 'setKeyWidth', applicable: ['width', 'dimension'] },
          { label: 'Freeboard Width', setter: 'setFreeboardWidth', applicable: ['width', 'dimension'] },
          { label: 'Slope Ratio', setter: 'setSlopeRatio', applicable: ['slope', 'ratio', 'factor'] }
        );
        break;
      case 'SlopeCalculator':
        setters.push(
          { label: 'Rise', setter: 'setRise', applicable: ['rise', 'height', 'vertical', 'dimension'] },
          { label: 'Run', setter: 'setRun', applicable: ['run', 'length', 'horizontal', 'dimension'] }
        );
        break;
      case 'SoilCalculator':
        setters.push(
          { label: 'Sand %', setter: 'setSand', applicable: ['sand', 'percent', 'percentage'] },
          { label: 'Silt %', setter: 'setSilt', applicable: ['silt', 'percent', 'percentage'] },
          { label: 'Clay %', setter: 'setClay', applicable: ['clay', 'percent', 'percentage'] }
        );
        break;
      case 'AcreFeetCalculator':
        setters.push(
          { label: 'Area', setter: 'setAreaInput', applicable: ['area', 'acres', 'hectares'] },
          { label: 'Depth', setter: 'setDepthInput', applicable: ['depth', 'height', 'dimension'] }
        );
        break;
    }
    
    return setters;
  };

  const applicableSetters = getApplicableSetters(currentScreen);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.sharedValuesContainer}>
          <View style={styles.sharedValuesHeader}>
            <Text style={styles.sharedValuesTitle}>Recent Calculations</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.sharedValuesList}>
            {sharedCalculations.length === 0 ? (
              <Text style={styles.emptyText}>No calculations yet. Complete a calculation to save values here.</Text>
            ) : (
              sharedCalculations.map((calc) => (
                <View key={calc.id} style={styles.sharedValueItem}>
                  <View style={styles.sharedValueInfo}>
                    <Text style={styles.sharedValueType}>{calc.type}</Text>
                    <Text style={styles.sharedValueLabel}>{calc.label}: {calc.value} {calc.units}</Text>
                    <Text style={styles.sharedValueTime}>{calc.timestamp}</Text>
                  </View>
                  
                  <View style={styles.useValueButtons}>
                    {applicableSetters.map((setter) => (
                      <TouchableOpacity
                        key={setter.setter}
                        style={styles.useValueButton}
                        onPress={() => onUseValue(calc.value, setter.setter)}
                      >
                        <Text style={styles.useValueButtonText}>→ {setter.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
});

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('CalculatorList');
  const [menuVisible, setMenuVisible] = useState(false);

  // Shared calculations state - for copying values between calculators
  const [sharedCalculations, setSharedCalculations] = useState([]);
  const [showSharedValues, setShowSharedValues] = useState(false);

  // Rain Catchment state
  const [units, setUnits] = useState('imperial');
  const [catchmentShape, setCatchmentShape] = useState('rectangular');
  // Rectangular inputs
  const [roofLength, setRoofLength] = useState('');
  const [roofWidth, setRoofWidth] = useState('');
  // Triangular inputs
  const [triangleBase, setTriangleBase] = useState('');
  const [triangleHeight, setTriangleHeight] = useState('');
  const [triangleSideA, setTriangleSideA] = useState('');
  const [triangleSideB, setTriangleSideB] = useState('');
  const [triangleSideC, setTriangleSideC] = useState('');
  const [triangleMethod, setTriangleMethod] = useState('baseHeight');
  // Circular inputs
  const [circleRadius, setCircleRadius] = useState('');
  const [circleDiameter, setCircleDiameter] = useState('');
  const [circleInputMethod, setCircleInputMethod] = useState('radius');
  // Common inputs
  const [rainfall, setRainfall] = useState('');
  const [runoffCoeff, setRunoffCoeff] = useState('0.8');
  const [waterResult, setWaterResult] = useState(null);

  // Cistern Sizing state
  const [cisternUnits, setCisternUnits] = useState('imperial');
  const [cisternCalcType, setCisternCalcType] = useState('storm');
  // Storm event inputs
  const [catchmentArea, setCatchmentArea] = useState('');
  const [stormRainfall, setStormRainfall] = useState('');
  const [stormRunoffCoeff, setStormRunoffCoeff] = useState('0.8');
  const [stormResult, setStormResult] = useState(null);
  // Drought period inputs
  const [numPeople, setNumPeople] = useState('');
  const [dailyConsumption, setDailyConsumption] = useState('');
  const [droughtDays, setDroughtDays] = useState('');
  const [droughtResult, setDroughtResult] = useState(null);

  // Tank Capacity state
  const [tankUnits, setTankUnits] = useState('imperial');
  const [tankShape, setTankShape] = useState('cylindrical');
  // Cylindrical inputs
  const [cylinderRadius, setCylinderRadius] = useState('');
  const [cylinderDiameter, setCylinderDiameter] = useState('');
  const [cylinderInputMethod, setCylinderInputMethod] = useState('radius');
  const [cylinderHeight, setCylinderHeight] = useState('');
  const [cylinderEffectiveHeight, setCylinderEffectiveHeight] = useState('');
  const [cylinderResult, setCylinderResult] = useState(null);
  // Rectangular inputs
  const [rectLength, setRectLength] = useState('');
  const [rectWidth, setRectWidth] = useState('');
  const [rectHeight, setRectHeight] = useState('');
  const [rectEffectiveHeight, setRectEffectiveHeight] = useState('');
  const [rectResult, setRectResult] = useState(null);

  // Water Pressure state
  const [pressureUnits, setPressureUnits] = useState('imperial');
  const [pressureCalcType, setPressureCalcType] = useState('pressure');
  // Pressure inputs
  const [waterHeight, setWaterHeight] = useState('');
  const [pressureResult, setPressureResult] = useState(null);
  // Weight inputs
  const [waterVolume, setWaterVolume] = useState('');
  const [weightResult, setWeightResult] = useState(null);

  // Embankment Calculator state
  const [embankmentUnits, setEmbankmentUnits] = useState('imperial');
  const [waterDepth, setWaterDepth] = useState('');
  const [keyWidth, setKeyWidth] = useState('');
  const [freeboardWidth, setFreeboardWidth] = useState('');
  const [slopeRatio, setSlopeRatio] = useState('2');
  const [embankmentResult, setEmbankmentResult] = useState(null);
  
  // Slope Calculator state (unchanged)
  const [rise, setRise] = useState('');
  const [run, setRun] = useState('');
  const [slopeResult, setSlopeResult] = useState(null);
  
  // Soil Calculator state (unchanged)
  const [sand, setSand] = useState('');
  const [silt, setSilt] = useState('');
  const [clay, setClay] = useState('');
  const [soilType, setSoilType] = useState('');

  // Acre-Feet Calculator state (unchanged)
  const [areaInput, setAreaInput] = useState('');
  const [depthInput, setDepthInput] = useState('');
  const [acreFeetUnits, setAcreFeetUnits] = useState('imperial');
  const [acreFeetResult, setAcreFeetResult] = useState(null);

  // Navigation functions
  const navigateToScreen = useCallback((screenName) => {
    setCurrentScreen(screenName);
    setMenuVisible(false);
  }, []);

  const goBack = useCallback(() => {
    setCurrentScreen('CalculatorList');
  }, []);

  // Shared calculations functions
  const addSharedCalculation = useCallback((type, label, value, units) => {
    const newCalculation = {
      id: Date.now(),
      type,
      label,
      value,
      units,
      timestamp: new Date().toLocaleTimeString()
    };
    setSharedCalculations(prev => [newCalculation, ...prev.slice(0, 19)]); // Keep last 20
  }, []);

  const useSharedValue = useCallback((value, setterName) => {
    // Map setter names to actual setter functions
    const setterMap = {
      setRoofLength, setRoofWidth, setRainfall, setRunoffCoeff,
      setCatchmentArea, setStormRainfall, setNumPeople, setDailyConsumption,
      setCylinderRadius, setCylinderDiameter, setCylinderHeight, setRectLength, setRectWidth,
      setWaterHeight, setWaterVolume,
      setWaterDepth, setKeyWidth, setFreeboardWidth, setSlopeRatio,
      setRise, setRun,
      setSand, setSilt, setClay,
      setAreaInput, setDepthInput
    };
    
    const setter = setterMap[setterName];
    if (setter) {
      setter(value);
      setShowSharedValues(false);
    }
  }, []);

  // Enhanced Rain Catchment functions
  const calculateWater = useCallback(() => {
    let area = 0;
    
    // Calculate area based on shape
    if (catchmentShape === 'rectangular') {
      const length = parseFloat(roofLength);
      const width = parseFloat(roofWidth);
      if (isNaN(length) || isNaN(width)) {
        Alert.alert('Error', 'Please enter valid dimensions');
        return;
      }
      area = length * width;
    } else if (catchmentShape === 'triangular') {
      if (triangleMethod === 'baseHeight') {
        const base = parseFloat(triangleBase);
        const height = parseFloat(triangleHeight);
        if (isNaN(base) || isNaN(height)) {
          Alert.alert('Error', 'Please enter valid base and height');
          return;
        }
        area = (base * height) / 2;
      } else {
        // Heron's formula
        const a = parseFloat(triangleSideA);
        const b = parseFloat(triangleSideB);
        const c = parseFloat(triangleSideC);
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
          Alert.alert('Error', 'Please enter valid side lengths');
          return;
        }
        const s = (a + b + c) / 2;
        const areaSquared = s * (s - a) * (s - b) * (s - c);
        if (areaSquared < 0) {
          Alert.alert('Error', 'Invalid triangle - check side lengths');
          return;
        }
        area = Math.sqrt(areaSquared);
      }
    } else if (catchmentShape === 'circular') {
      let radius;
      if (circleInputMethod === 'radius') {
        radius = parseFloat(circleRadius);
        if (isNaN(radius)) {
          Alert.alert('Error', 'Please enter valid radius');
          return;
        }
      } else {
        const diameter = parseFloat(circleDiameter);
        if (isNaN(diameter)) {
          Alert.alert('Error', 'Please enter valid diameter');
          return;
        }
        radius = diameter / 2;
      }
      area = Math.PI * radius * radius;
    }
    
    const rain = parseFloat(rainfall);
    const coeff = parseFloat(runoffCoeff);
    
    if (isNaN(rain) || isNaN(coeff)) {
      Alert.alert('Error', 'Please enter valid rainfall and runoff coefficient');
      return;
    }
    
    let maxWaterAmount, netWaterAmount;
    
    if (units === 'imperial') {
      // Convert inches to feet for calculation
      const rainFeet = rain / 12;
      // Use proper conversion: 7.48 gal/ft³
      maxWaterAmount = area * rainFeet * 7.48;
      netWaterAmount = maxWaterAmount * coeff;
    } else {
      // Metric: area (m²) × rainfall (mm) = liters
      maxWaterAmount = area * rain;
      netWaterAmount = maxWaterAmount * coeff;
    }
    
    setWaterResult({
      area: formatNumber(area.toFixed(1)),
      maxAmount: formatNumber(maxWaterAmount.toFixed(2)),
      netAmount: formatNumber(netWaterAmount.toFixed(2))
    });

    // Add to shared calculations
    addSharedCalculation('Rain Catchment', 'Catchment Area', area.toFixed(1), units === 'imperial' ? 'sq ft' : 'sq m');
    addSharedCalculation('Rain Catchment', 'Net Water', netWaterAmount.toFixed(2), units === 'imperial' ? 'gallons' : 'liters');
  }, [catchmentShape, roofLength, roofWidth, triangleBase, triangleHeight, triangleSideA, triangleSideB, triangleSideC, triangleMethod, circleRadius, circleDiameter, circleInputMethod, rainfall, runoffCoeff, units, addSharedCalculation]);

  const handleUnitsChange = useCallback((newUnits) => {
    setUnits(newUnits);
  }, []);

  const handleCatchmentShapeChange = useCallback((shape) => {
    setCatchmentShape(shape);
    // Clear previous results when changing shape
    setWaterResult(null);
  }, []);

  // Cistern Sizing functions
  const calculateStormCistern = useCallback(() => {
    const area = parseFloat(catchmentArea);
    const rain = parseFloat(stormRainfall);
    const coeff = parseFloat(stormRunoffCoeff);
    
    if (isNaN(area) || isNaN(rain) || isNaN(coeff)) {
      Alert.alert('Error', 'Please enter valid numbers');
      return;
    }
    
    let result;
    if (cisternUnits === 'imperial') {
      const rainFeet = rain / 12;
      result = area * rainFeet * 7.48 * coeff;
    } else {
      result = area * rain * coeff;
    }
    
    setStormResult(formatNumber(result.toFixed(0)));
    
    // Add to shared calculations
    addSharedCalculation('Cistern Sizing', 'Storm Capacity', result.toFixed(0), cisternUnits === 'imperial' ? 'gallons' : 'liters');
  }, [catchmentArea, stormRainfall, stormRunoffCoeff, cisternUnits, addSharedCalculation]);

  const calculateDroughtStorage = useCallback(() => {
    const people = parseFloat(numPeople);
    const consumption = parseFloat(dailyConsumption);
    const days = parseFloat(droughtDays);
    
    if (isNaN(people) || isNaN(consumption) || isNaN(days)) {
      Alert.alert('Error', 'Please enter valid numbers');
      return;
    }
    
    const result = people * consumption * days;
    setDroughtResult(formatNumber(result.toFixed(0)));
    
    // Add to shared calculations
    addSharedCalculation('Cistern Sizing', 'Drought Storage', result.toFixed(0), cisternUnits === 'imperial' ? 'gallons' : 'liters');
  }, [numPeople, dailyConsumption, droughtDays, addSharedCalculation]);

  // Tank Capacity functions
  const calculateCylinderCapacity = useCallback(() => {
    let radius;
    if (cylinderInputMethod === 'radius') {
      radius = parseFloat(cylinderRadius);
      if (isNaN(radius)) {
        Alert.alert('Error', 'Please enter valid radius');
        return;
      }
    } else {
      const diameter = parseFloat(cylinderDiameter);
      if (isNaN(diameter)) {
        Alert.alert('Error', 'Please enter valid diameter');
        return;
      }
      radius = diameter / 2;
    }
    
    const effHeight = parseFloat(cylinderEffectiveHeight);
    if (isNaN(effHeight)) {
      Alert.alert('Error', 'Please enter valid effective height');
      return;
    }
    
    let result;
    if (tankUnits === 'imperial') {
      result = Math.PI * radius * radius * effHeight * 7.48;
    } else {
      // Metric: π × r² × h (in cm) ÷ 1000 = liters
      const radiusCm = radius * 100;
      const heightCm = effHeight * 100;
      result = (Math.PI * radiusCm * radiusCm * heightCm) / 1000;
    }
    
    setCylinderResult(formatNumber(result.toFixed(0)));
    
    // Add to shared calculations
    addSharedCalculation('Tank Capacity', 'Cylinder Volume', result.toFixed(0), tankUnits === 'imperial' ? 'gallons' : 'liters');
  }, [cylinderInputMethod, cylinderRadius, cylinderDiameter, cylinderEffectiveHeight, tankUnits, addSharedCalculation]);

  const calculateRectCapacity = useCallback(() => {
    const length = parseFloat(rectLength);
    const width = parseFloat(rectWidth);
    const effHeight = parseFloat(rectEffectiveHeight);
    
    if (isNaN(length) || isNaN(width) || isNaN(effHeight)) {
      Alert.alert('Error', 'Please enter valid dimensions');
      return;
    }
    
    let result;
    if (tankUnits === 'imperial') {
      result = length * width * effHeight * 7.48;
    } else {
      // Metric: L × W × H (in cm) ÷ 1000 = liters
      const lengthCm = length * 100;
      const widthCm = width * 100;
      const heightCm = effHeight * 100;
      result = (lengthCm * widthCm * heightCm) / 1000;
    }
    
    setRectResult(formatNumber(result.toFixed(0)));
    
    // Add to shared calculations
    addSharedCalculation('Tank Capacity', 'Rectangle Volume', result.toFixed(0), tankUnits === 'imperial' ? 'gallons' : 'liters');
  }, [rectLength, rectWidth, rectEffectiveHeight, tankUnits, addSharedCalculation]);

  // Water Pressure functions
  const calculatePressure = useCallback(() => {
    const height = parseFloat(waterHeight);
    if (isNaN(height)) {
      Alert.alert('Error', 'Please enter valid height');
      return;
    }
    
    let result;
    if (pressureUnits === 'imperial') {
      result = height * 0.43; // psi
    } else {
      result = height * 9.8; // kPa (approximate)
    }
    
    setPressureResult(result.toFixed(2));
    
    // Add to shared calculations
    addSharedCalculation('Water Pressure', 'Pressure', result.toFixed(2), pressureUnits === 'imperial' ? 'psi' : 'kPa');
  }, [waterHeight, pressureUnits, addSharedCalculation]);

  const calculateWeight = useCallback(() => {
    const volume = parseFloat(waterVolume);
    if (isNaN(volume)) {
      Alert.alert('Error', 'Please enter valid volume');
      return;
    }
    
    let result;
    if (pressureUnits === 'imperial') {
      result = volume * 8.34; // pounds
    } else {
      result = volume * 1; // kg (1 liter = 1 kg)
    }
    
    setWeightResult(formatNumber(result.toFixed(0)));
    
    // Add to shared calculations
    addSharedCalculation('Water Pressure', 'Weight', result.toFixed(0), pressureUnits === 'imperial' ? 'pounds' : 'kg');
  }, [waterVolume, pressureUnits, addSharedCalculation]);

  // Embankment Calculator functions
  const calculateEmbankment = useCallback(() => {
    const depth = parseFloat(waterDepth);
    const keyW = parseFloat(keyWidth);
    const freeboardW = parseFloat(freeboardWidth);
    const slope = parseFloat(slopeRatio);
    
    if (isNaN(depth) || isNaN(keyW) || isNaN(freeboardW) || isNaN(slope)) {
      Alert.alert('Error', 'Please enter valid dimensions and slope ratio');
      return;
    }
    
    if (slope <= 0) {
      Alert.alert('Error', 'Slope ratio must be greater than 0');
      return;
    }
    
    // Updated formulas with variable slope ratio:
    // Bottom of key to top of freeboard = depth + 2
    // Distance from deep zone to center of key = slope ratio × (depth + 1 + keyWidth/slope ratio)
    
    const keyToFreeboard = depth + 2;
    const centerDistance = slope * (depth + 1 + (keyW / slope));
    
    setEmbankmentResult({
      keyToFreeboard: keyToFreeboard.toFixed(1),
      centerDistance: centerDistance.toFixed(1)
    });
    
    // Add to shared calculations
    addSharedCalculation('Embankment', 'Key to Freeboard', keyToFreeboard.toFixed(1), embankmentUnits === 'imperial' ? 'ft' : 'm');
    addSharedCalculation('Embankment', 'Center Distance', centerDistance.toFixed(1), embankmentUnits === 'imperial' ? 'ft' : 'm');
  }, [waterDepth, keyWidth, freeboardWidth, slopeRatio, embankmentUnits, addSharedCalculation]);

  // Slope Calculator functions (unchanged)
  const calculateSlope = useCallback(() => {
    const riseValue = parseFloat(rise);
    const runValue = parseFloat(run);

    if (isNaN(riseValue) || isNaN(runValue) || runValue === 0) {
      Alert.alert('Error', 'Please enter valid numbers');
      return;
    }

    const slopePercent = (riseValue / runValue) * 100;
    const slopeDegrees = Math.atan(riseValue / runValue) * (180 / Math.PI);
    const slopeRatio = `1:${(runValue / riseValue).toFixed(2)}`;

    setSlopeResult({
      percent: slopePercent.toFixed(2),
      degrees: slopeDegrees.toFixed(2),
      ratio: slopeRatio,
    });
  }, [rise, run]);

  // Soil Calculator functions - Enhanced with USDA soil texture definitions
  const calculateSoil = useCallback(() => {
    const sandPercent = parseFloat(sand);
    const siltPercent = parseFloat(silt);
    const clayPercent = parseFloat(clay);

    if (isNaN(sandPercent) || isNaN(siltPercent) || isNaN(clayPercent)) {
      Alert.alert('Error', 'Please enter valid numbers');
      return;
    }

    const total = sandPercent + siltPercent + clayPercent;
    if (Math.abs(total - 100) > 1) {
      Alert.alert('Error', 'Percentages must add up to 100%');
      return;
    }

    // USDA Soil Texture Classification Logic
    let type = '';
    
    // Helper calculations for complex conditions
    const siltPlus15Clay = siltPercent + (1.5 * clayPercent);
    const siltPlus2Clay = siltPercent + (2 * clayPercent);
    
    // Primary classification based on USDA definitions
    if (sandPercent > 85 && siltPlus15Clay < 15) {
      type = 'Sand';
    }
    else if (sandPercent >= 70 && sandPercent <= 91 && siltPlus15Clay >= 15 && siltPlus2Clay < 30) {
      type = 'Loamy Sand';
    }
    else if (clayPercent >= 40 && sandPercent <= 45 && siltPercent < 40) {
      type = 'Clay';
    }
    else if (clayPercent >= 40 && siltPercent >= 40) {
      type = 'Silty Clay';
    }
    else if (clayPercent >= 35 && sandPercent >= 45) {
      type = 'Sandy Clay';
    }
    else if (clayPercent >= 27 && clayPercent <= 40 && sandPercent <= 20) {
      type = 'Silty Clay Loam';
    }
    else if (clayPercent >= 27 && clayPercent <= 40 && sandPercent >= 20 && sandPercent <= 46) {
      type = 'Clay Loam';
    }
    else if (clayPercent >= 20 && clayPercent <= 35 && siltPercent < 28 && sandPercent > 45) {
      type = 'Sandy Clay Loam';
    }
    else if (siltPercent >= 80 && clayPercent < 12) {
      type = 'Silt';
    }
    else if (siltPercent >= 50 && ((clayPercent >= 12 && clayPercent <= 27) || (siltPercent >= 50 && siltPercent <= 80 && clayPercent < 12))) {
      type = 'Silt Loam';
    }
    else if (clayPercent >= 7 && clayPercent <= 27 && siltPercent >= 28 && siltPercent <= 50 && sandPercent <= 52) {
      type = 'Loam';
    }
    else if ((clayPercent >= 7 && clayPercent <= 20 && sandPercent > 52 && siltPlus2Clay >= 30) || 
             (clayPercent < 7 && siltPercent < 50 && sandPercent > 43)) {
      type = 'Sandy Loam';
    }
    else {
      // Fallback for edge cases
      if (sandPercent > 50) {
        if (clayPercent > 20) type = 'Sandy Clay Loam';
        else type = 'Sandy Loam';
      } else if (clayPercent > 40) {
        type = 'Clay';
      } else if (siltPercent > 50) {
        type = 'Silt Loam';
      } else {
        type = 'Loam';
      }
    }

    setSoilType(type);
  }, [sand, silt, clay]);

  // Acre-Feet Calculator functions (unchanged)
  const calculateAcreFeet = useCallback(() => {
    const area = parseFloat(areaInput);
    const depth = parseFloat(depthInput);

    if (isNaN(area) || isNaN(depth)) {
      Alert.alert('Error', 'Please enter valid numbers');
      return;
    }

    let acreFeet;
    let gallons;
    let liters;

    if (acreFeetUnits === 'imperial') {
      acreFeet = area * depth;
      gallons = acreFeet * 325851;
      liters = gallons * 3.78541;
    } else {
      const hectareMeters = area * depth;
      acreFeet = hectareMeters * 2.47105;
      liters = hectareMeters * 10000000;
      gallons = liters / 3.78541;
    }

    setAcreFeetResult({
      acreFeet: formatNumber(acreFeet.toFixed(3)),
      gallons: formatNumber(gallons.toFixed(0)),
      liters: formatNumber(liters.toFixed(0)),
    });
  }, [areaInput, depthInput, acreFeetUnits]);

  const handleAcreFeetUnitsChange = useCallback((newUnits) => {
    setAcreFeetUnits(newUnits);
    setAreaInput('');
    setDepthInput('');
    setAcreFeetResult(null);
  }, []);

  // Render screen based on currentScreen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'CalculatorList':
        return <CalculatorListScreen onNavigate={navigateToScreen} />;
      case 'RainCatchment':
        return (
          <RainCatchmentScreen 
            units={units}
            catchmentShape={catchmentShape}
            roofLength={roofLength}
            roofWidth={roofWidth}
            triangleBase={triangleBase}
            triangleHeight={triangleHeight}
            triangleSideA={triangleSideA}
            triangleSideB={triangleSideB}
            triangleSideC={triangleSideC}
            triangleMethod={triangleMethod}
            circleRadius={circleRadius}
            circleDiameter={circleDiameter}
            circleInputMethod={circleInputMethod}
            rainfall={rainfall}
            runoffCoeff={runoffCoeff}
            waterResult={waterResult}
            onUnitsChange={handleUnitsChange}
            onCatchmentShapeChange={handleCatchmentShapeChange}
            onRoofLengthChange={setRoofLength}
            onRoofWidthChange={setRoofWidth}
            onTriangleBaseChange={setTriangleBase}
            onTriangleHeightChange={setTriangleHeight}
            onTriangleSideAChange={setTriangleSideA}
            onTriangleSideBChange={setTriangleSideB}
            onTriangleSideCChange={setTriangleSideC}
            onTriangleMethodChange={setTriangleMethod}
            onCircleRadiusChange={setCircleRadius}
            onCircleDiameterChange={setCircleDiameter}
            onCircleInputMethodChange={setCircleInputMethod}
            onRainfallChange={setRainfall}
            onRunoffCoeffChange={setRunoffCoeff}
            onCalculate={calculateWater}
          />
        );
      case 'CisternSizing':
        return (
          <CisternSizingScreen 
            units={cisternUnits}
            cisternCalcType={cisternCalcType}
            catchmentArea={catchmentArea}
            stormRainfall={stormRainfall}
            stormRunoffCoeff={stormRunoffCoeff}
            stormResult={stormResult}
            numPeople={numPeople}
            dailyConsumption={dailyConsumption}
            droughtDays={droughtDays}
            droughtResult={droughtResult}
            onUnitsChange={setCisternUnits}
            onCisternCalcTypeChange={setCisternCalcType}
            onCatchmentAreaChange={setCatchmentArea}
            onStormRainfallChange={setStormRainfall}
            onStormRunoffCoeffChange={setStormRunoffCoeff}
            onNumPeopleChange={setNumPeople}
            onDailyConsumptionChange={setDailyConsumption}
            onDroughtDaysChange={setDroughtDays}
            onCalculateStorm={calculateStormCistern}
            onCalculateDrought={calculateDroughtStorage}
          />
        );
      case 'TankCapacity':
        return (
          <TankCapacityScreen 
            units={tankUnits}
            tankShape={tankShape}
            cylinderRadius={cylinderRadius}
            cylinderDiameter={cylinderDiameter}
            cylinderInputMethod={cylinderInputMethod}
            cylinderHeight={cylinderHeight}
            cylinderEffectiveHeight={cylinderEffectiveHeight}
            cylinderResult={cylinderResult}
            rectLength={rectLength}
            rectWidth={rectWidth}
            rectHeight={rectHeight}
            rectEffectiveHeight={rectEffectiveHeight}
            rectResult={rectResult}
            onUnitsChange={setTankUnits}
            onTankShapeChange={setTankShape}
            onCylinderRadiusChange={setCylinderRadius}
            onCylinderDiameterChange={setCylinderDiameter}
            onCylinderInputMethodChange={setCylinderInputMethod}
            onCylinderHeightChange={setCylinderHeight}
            onCylinderEffectiveHeightChange={setCylinderEffectiveHeight}
            onRectLengthChange={setRectLength}
            onRectWidthChange={setRectWidth}
            onRectHeightChange={setRectHeight}
            onRectEffectiveHeightChange={setRectEffectiveHeight}
            onCalculateCylinder={calculateCylinderCapacity}
            onCalculateRect={calculateRectCapacity}
          />
        );
      case 'WaterPressure':
        return (
          <WaterPressureScreen 
            units={pressureUnits}
            pressureCalcType={pressureCalcType}
            waterHeight={waterHeight}
            pressureResult={pressureResult}
            waterVolume={waterVolume}
            weightResult={weightResult}
            onUnitsChange={setPressureUnits}
            onPressureCalcTypeChange={setPressureCalcType}
            onWaterHeightChange={setWaterHeight}
            onWaterVolumeChange={setWaterVolume}
            onCalculatePressure={calculatePressure}
            onCalculateWeight={calculateWeight}
          />
        );
      case 'EmbankmentCalculator':
        return (
          <EmbankmentCalculatorScreen 
            units={embankmentUnits}
            waterDepth={waterDepth}
            keyWidth={keyWidth}
            freeboardWidth={freeboardWidth}
            slopeRatio={slopeRatio}
            embankmentResult={embankmentResult}
            onUnitsChange={setEmbankmentUnits}
            onWaterDepthChange={setWaterDepth}
            onKeyWidthChange={setKeyWidth}
            onFreeboardWidthChange={setFreeboardWidth}
            onSlopeRatioChange={setSlopeRatio}
            onCalculate={calculateEmbankment}
          />
        );
      case 'SlopeCalculator':
        return (
          <SlopeCalculatorScreen 
            rise={rise}
            run={run}
            slopeResult={slopeResult}
            onRiseChange={setRise}
            onRunChange={setRun}
            onCalculate={calculateSlope}
          />
        );
      case 'SoilCalculator':
        return (
          <SoilCalculatorScreen 
            sand={sand}
            silt={silt}
            clay={clay}
            soilType={soilType}
            onSandChange={setSand}
            onSiltChange={setSilt}
            onClayChange={setClay}
            onCalculate={calculateSoil}
          />
        );
      case 'AcreFeetCalculator':
        return (
          <AcreFeetCalculatorScreen 
            areaInput={areaInput}
            depthInput={depthInput}
            acreFeetUnits={acreFeetUnits}
            acreFeetResult={acreFeetResult}
            onAreaChange={setAreaInput}
            onDepthChange={setDepthInput}
            onUnitsChange={handleAcreFeetUnitsChange}
            onCalculate={calculateAcreFeet}
          />
        );
      default:
        return <CalculatorListScreen onNavigate={navigateToScreen} />;
    }
  };

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'CalculatorList': return 'Calculators';
      case 'RainCatchment': return 'Rain Catchment';
      case 'CisternSizing': return 'Cistern Sizing';
      case 'TankCapacity': return 'Tank Capacity';
      case 'WaterPressure': return 'Water Pressure';
      case 'EmbankmentCalculator': return 'Embankment Calculator';
      case 'SlopeCalculator': return 'Slope Calculator';
      case 'SoilCalculator': return 'Soil Calculator';
      case 'AcreFeetCalculator': return 'Acre-Feet Calculator';
      default: return 'Calculators';
    }
  };

  return (
    <View style={styles.appContainer}>
      {/* Header */}
      <View style={styles.header}>
        {currentScreen !== 'CalculatorList' && (
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{getScreenTitle()}</Text>
        <View style={styles.headerButtons}>
          {currentScreen !== 'CalculatorList' && (
            <TouchableOpacity 
              style={styles.sharedButton}
              onPress={() => setShowSharedValues(true)}
            >
              <Text style={styles.sharedButtonText}>📋</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setMenuVisible(true)}
          >
            <Text style={styles.menuButtonText}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {renderScreen()}

      {/* Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigateToScreen('MeetingPrep')}
            >
              <Text style={styles.menuItemText}>Meeting Prep</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigateToScreen('ClientQuestions')}
            >
              <Text style={styles.menuItemText}>Client Questions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigateToScreen('PropertyWalk')}
            >
              <Text style={styles.menuItemText}>Property Walk</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigateToScreen('TestSlices')}
            >
              <Text style={styles.menuItemText}>Test Slices</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigateToScreen('FollowUpSteps')}
            >
              <Text style={styles.menuItemText}>Follow Up Steps</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Shared Values Modal */}
      <SharedValuesModal
        visible={showSharedValues}
        sharedCalculations={sharedCalculations}
        onClose={() => setShowSharedValues(false)}
        onUseValue={useSharedValue}
        currentScreen={currentScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 10,
    minWidth: 60,
  },
  backButtonText: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
    flex: 1,
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sharedButton: {
    padding: 10,
    marginRight: 5,
  },
  sharedButtonText: {
    fontSize: 20,
    color: '#1976D2',
  },
  menuButton: {
    padding: 10,
    minWidth: 60,
    alignItems: 'flex-end',
  },
  menuButtonText: {
    fontSize: 24,
    color: '#1976D2',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 20,
    textAlign: 'center',
  },
  calculatorCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  calculatorDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  unitContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  unitButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 5,
  },
  unitButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  unitButtonText: {
    fontSize: 16,
    color: '#333',
  },
  activeText: {
    color: '#fff',
  },
  shapeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  shapeButton: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 5,
  },
  shapeButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  shapeButtonText: {
    fontSize: 14,
    color: '#333',
  },
  methodContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  methodButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 5,
  },
  methodButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  methodButtonText: {
    fontSize: 14,
    color: '#333',
  },
  formula: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
  },
  resultText: {
    fontSize: 16,
    color: '#1976D2',
    textAlign: 'center',
    marginBottom: 5,
  },
  guide: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 5,
  },
  guideSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
    marginTop: 8,
    marginBottom: 3,
  },
  guideText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  guideNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginTop: 60,
    marginRight: 15,
    borderRadius: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  sharedValuesContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  sharedValuesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sharedValuesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  sharedValuesList: {
    maxHeight: 400,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20,
  },
  sharedValueItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sharedValueInfo: {
    marginBottom: 10,
  },
  sharedValueType: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  sharedValueLabel: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },
  sharedValueTime: {
    fontSize: 12,
    color: '#666',
  },
  useValueButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  useValueButton: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 4,
  },
  useValueButtonText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 100, // Space for screen buttons at bottom
  },
});

export default App;