import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons'; 

export default function App() {

  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(1.70);
  const [genero, setGenero] = useState('feminino');
  const [modoEscuro, setModoEscuro] = useState(false);

  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [corClassificacao, setCorClassificacao] = useState('#000000');
  
  const calcularIMC = () => {
    const imcCalculado = peso / (altura * altura);
    setImc(imcCalculado.toFixed(2));

    if (imcCalculado < 18.5) {
      setClassificacao('Abaixo do peso');
      setCorClassificacao('#3498DB');
    } else if (imcCalculado < 24.9) {
      setClassificacao('Peso normal');
      setCorClassificacao('#4CAF50');
    } else if (imcCalculado < 29.9) {
      setClassificacao('Sobrepeso');
      setCorClassificacao('#FFC107');
    } else if (imcCalculado < 34.9) {
      setClassificacao('Obesidade grau I');
      setCorClassificacao('#E74C3C');
    } else if (imcCalculado < 39.9) {
      setClassificacao('Obesidade grau II');
      setCorClassificacao('#C0392B');
    } else {
      setClassificacao('Obesidade grau III');
      setCorClassificacao('#7B241C');
    }
  };

  const limparCampos = () => {
    setPeso(70);
    setAltura(1.70);
    setImc(null);
    setClassificacao('');
    setCorClassificacao('#000000');
    setGenero('masculino');
  };
  
  // Estilos modo escuro
  const containerStyle = modoEscuro ? [styles.container, styles.containerDark] : styles.container;
  const textStyle = modoEscuro ? styles.textDark : styles.textLight;
  const titleStyle = modoEscuro ? [styles.titulo, styles.textDark] : [styles.titulo, styles.textLight];
  const pickerColor = modoEscuro ? '#FFFFFF' : '#000000';

  return (
    <View style={containerStyle}>

      <TouchableOpacity 
        style={styles.themeButton} 
        onPress={() => setModoEscuro(!modoEscuro)}
      >
        <Ionicons 
          name={modoEscuro ? "sunny" : "moon"} 
          size={28} 
          color={modoEscuro ? "#FFD700" : "#22031F"} 
        />
      </TouchableOpacity>

      <Text style={titleStyle}>Calculadora de IMC</Text>

      <Text style={[styles.label, textStyle]}>Gênero</Text>
      <View style={styles.pickerContainer}>
        <Picker
            selectedValue={genero}
            onValueChange={(itemValue) => setGenero(itemValue)}
            style={{ color: pickerColor }}
        >
            <Picker.Item label="Masculino" value="masculino" />
            <Picker.Item label="Feminino" value="feminino" />
        </Picker>
      </View>

      <Text style={[styles.label, textStyle]}>Peso: {peso.toFixed(1)} kg</Text>
      <Slider
        style={styles.slider}
        minimumValue={30}
        maximumValue={200}
        step={0.5}
        value={peso}
        onValueChange={setPeso}
        minimumTrackTintColor="#C25B8F" 
        maximumTrackTintColor={modoEscuro ? "#555" : "#CCC"}
        thumbTintColor="#F3B9C7" 
      />

      <Text style={[styles.label, textStyle]}>Altura: {altura.toFixed(2)} m</Text>
       <Slider
        style={styles.slider}
        minimumValue={1.00}
        maximumValue={2.50}
        step={0.01}
        value={altura}
        onValueChange={setAltura}
        minimumTrackTintColor="#C25B8F" 
        maximumTrackTintColor={modoEscuro ? "#555" : "#CCC"}
        thumbTintColor="#F3B9C7"
      />

      <View style={styles.botoesContainer}>
        <TouchableOpacity 
          style={[styles.botao, styles.botaoCalcular, modoEscuro && styles.botaoCalcularDark]} 
          onPress={calcularIMC}
        >
          <Text style={styles.textoBotao}>Calcular IMC</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.botao, styles.botaoLimpar, modoEscuro && styles.botaoLimparDark]} 
          onPress={limparCampos}
        >
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {imc && (
        <View style={styles.resultado}>
          <Text style={[styles.textoResultado, textStyle]}>Seu IMC: <Text style={styles.valorIMC}>{imc}</Text></Text>
          <Text style={[styles.textoClassificacao, textStyle]}>
            Classificação: <Text style={[styles.destaque, {color: corClassificacao}]}>{classificacao}</Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  containerDark: {
    backgroundColor: '#1C1C1E', 
  },
  textLight: {
    color: '#22031F',
  },
  textDark: {
    color: '#EAEAEA',
  },
  themeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    padding: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    borderColor: '#F3B9C7', 
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'transparent', 
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botao: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botaoCalcular: {
    backgroundColor: '#22031F', 
  },
  botaoCalcularDark: {
    backgroundColor: '#8A3B68', 
  },
  botaoLimpar: {
    backgroundColor: '#304A34', 
  },
  botaoLimparDark: {
    backgroundColor: '#4E8055', 
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultado: {
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderWidth: 1,
    borderColor: '#C25B8F', 
    alignItems: 'center',
  },
  textoResultado: {
    fontSize: 18,
  },
  valorIMC: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  textoClassificacao: {
    fontSize: 16,
    marginTop: 8,
  },
  destaque: {
    fontWeight: 'bold',
  },
});