import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert, Platform } from 'react-native';

export default function App() {
  // Estado para o armazenamento dos valores
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [corClassificacao, setCorClassificacao] = useState('#000000');

  // Validação se a altura foi digitada em CM
  const validarAltura = (valor) => {
    const valorNumerico = parseFloat(valor.replace(',', '.')) || 0;
    
    if (valorNumerico >= 100 && valorNumerico <= 250) {
      Alert.alert(
        'Altura em centímetros?',
        'Você digitou a altura em cm. Deseja converter para metros?',
        [
          { text: 'Não', style: 'cancel' },
          { 
            text: 'Sim', 
            onPress: () => {
              const alturaEmMetros = (valorNumerico / 100).toFixed(2);
              setAltura(alturaEmMetros);
            } 
          }
        ]
      );
    }
    setAltura(valor);
  };

  const calcularIMC = () => {
    Keyboard.dismiss();

    const pesoNum = parseFloat(peso.replace(',', '.')) || 0;
    const alturaNum = parseFloat(altura.replace(',', '.')) || 0;

    if (!pesoNum || !alturaNum) {
      Alert.alert('Erro', 'Preencha peso e altura corretamente!');
      return;
    }

    if (pesoNum <= 0 || alturaNum <= 0) {
      Alert.alert('Erro', 'Peso e altura devem ser maiores que zero!');
      return;
    }

    if (alturaNum > 2.5) {
      Alert.alert('Erro', 'Digite a altura em metros (ex: 1.70) ou em cm (170)!');
      return;
    }
    
    // Classificações

    const imcCalculado = pesoNum / (alturaNum * alturaNum);
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
    setPeso('');
    setAltura('');
    setImc(null);
    setClassificacao('');
    setCorClassificacao('#000000');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (m ou cm)"
        keyboardType="numeric"
        value={altura}
        onChangeText={validarAltura}
      />

      <View style={styles.botoesContainer}>
        <TouchableOpacity 
          style={[styles.botao, styles.botaoCalcular]} 
          onPress={calcularIMC}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>Calcular IMC</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.botao, styles.botaoLimpar]} 
          onPress={limparCampos}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {imc && (
        <View style={styles.resultado}>
          <Text style={styles.textoResultado}>Seu IMC: <Text style={styles.valorIMC}>{imc}</Text></Text>
          <Text style={styles.textoClassificacao}>
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
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#22031F',
  },
  input: {
    height: 50,
    borderColor: '#F3B9C7',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    fontSize: 16,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botao: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    ...Platform.select({
      android: {
        elevation: 4,
      },
    }),
  },
  botaoCalcular: {
    backgroundColor: '#22031F',
  },
  botaoLimpar: {
    backgroundColor: '#304A34',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#C25B8F',
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 8,
      },
    }),
  },
  textoResultado: {
    fontSize: 18,
    color: '#333',
  },
  valorIMC: {
    fontWeight: 'bold',
    color: '#304A34',
  },
  textoClassificacao: {
    fontSize: 16,
    marginTop: 8,
    color: '#22031F',
  },
  destaque: {
    fontWeight: 'bold',
  },
});