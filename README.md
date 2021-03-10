# rut-utils

Paquete de utilidades para el manejo de RUT chileno. Es compatible con IE10 y node >= 6, no tiene dependencias externas e incluye declaraciones de typescript 😄

## Instalación

**NPM**

```shell
npm i @gzanni/rut-utils

```

**Yarn**

```shell
yarn add @gzanni/rut-utils
```

## API

```javascript
// Usando un namespace
import rutUtils from '@gzanni/rut-utils'

// Funciones individuales
import { format, isValid } from '@gzanni/rut-utils'
```

El ejemplo de abajo muestra un caso de uso:

```javascript
import React, { useState } from 'react'
import { format, isValid } from '@gzanni/rut-utils'

const App = () => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    event.persist()

    setValue(format(event.target.value))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isValid(value)) {
      // ...haz lo que sea con el rut válido
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={value} />
    </form>
  )
}
```

### Dándole formato a un rut

#### `format(input: ValidInput, formatType?: Format): string`

Limpia cualquier caracter no numérico distinto de `K` o `k` y formatea la entrada.

##### Argumentos

- **input** (ValidInput): La entrada a formatear
- **formatType** (Format): String opcional que determina el formato a aplicar. Por defecto es `standard`.

##### Retorna

String formateado según el `formatType` dado.

```javascript
format('112223334') // => '11.222.333-4'
format(112223334) // => '11.222.333-4'
format('112223334', 'dashOnly') // => '11222333-4'
format('11.222.333-4', 'noSymbols') // => '112223334'

// Elimina los caracteres no válidos
format('11aaa2223334') // => '11.222.333-4'
```

##### Consideraciones

`K` y `k` son caracteres válidos, por lo que no son descartados al formatear a pesar de no estar en la posición correcta.

```javascript
format('11kkk3334') // => '11.kkk.333-4'
```

Para evitar este caso, se puede utilizar `format` en conjunto a `isFormatValid`:

```javascript
const handleChange = event => {
  event.persist()
  const formatted = format(event.target.value, 'standard')

  if (isFormatValid(formatted, 'standard') {
    setValue(formatted)
  }
}
```

#### `isFormatValid(input: ValidInput, formatType?: Format & 'any'): boolean`

Valida que la entrada tenga el formato especificado, o que cumpla con alguno de los formatos válidos.

##### Argumentos

- **input** (ValidInput): La entrada a validar
- **formatType** (Format & 'any'): String opcional que determina el formato a validar. El valor por defecto `any` es inclusivo, es decir, basta con que la entrada cumpla con al menos uno de los formatos válidos. En cualquier otro caso, la validación será únicamente contra el formato dado.

##### Retorna

Booleano que representa si el input cumple con el formato dado.

```javascript
isFormatValid('11222333-4') // => true
isFormatValid('11222333-4', 'standard') // => false
isFormatValid('11222333-4', 'dashOnly') // => true
isFormatValid('11222333-4', 'noSymbols') // => false
```

##### Consideraciones

`isFormatValid` sólo compara el _patrón_ de la entrada, no su contenido.

```javascript
isFormatValid('aa.bbb.ccc-n') // => true
```

#### `isValid(input: ValidInput): boolean`

Valida que la entrada cumpla con las siguientes características:

- Sólo contiene caracteres válidos
- Tiene al menos dos caracteres
- El último caracter es un dígito verificador válido

##### Argumentos

- **input** (ValidInput): La entrada a validar

##### Retorna

Booleano que representa la validez de la entrada

```javascript
isValid('108646292') // => true
isValid('10.864.629-2') // => true
isValid('10864629-2') // => true
isValid('10864629-3') // => false
isValid('11222333-h') // => false
isValid('1') // => false
```

##### Consideraciones

`isValid` no valida largo máximo. En ambientes node, es **extremadamente** recomendado realizar esta validación para evitar [brechas de seguridad ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS).

```javascript
const isRutValid = rut.length <= 20 && isValid(rut)
```

`isValid` valida que la entrada sólo tenga caracteres válidos para el rut, pero **no** su formato.

```javascript
isValid('10...........864.......629-------2') // => true
```

Si no se confía en que la entrada ha sido previamente formateada (ej. en un evento `onChange`), se puede utilizar en conjunto a `isFormatValid`.

```javascript
const isRutValid = isFormatValid(rut) && isValid(rut)
```

#### `toJSON(input: ValidInput, { formatType?: Format & 'any' } = {}): object`

Utilidad para obtener un resumen de la entrada.

##### Argumentos:

- **input** (ValidInput): La entrada a resumir
- **formatType** (Format & 'any'): String opcional que determina el formato a validar y aplicar. Por defecto es `standard`.

##### Retorna:

Un objeto plano con el detalle de la entrada. Utiliza las implementaciones descritas anteriormente para obtener los valores.

```javascript
toJSON('108646292')
// {
//   digit: '2'
//   formattedValue: '10.864.629-2'
//   isFormatValid: false
//   isValid: true
//   serial: '10864629'
// }
```

### Tipos

#### ValidInput

Cualquier string o número:

```typescript
type ValidInput = string | number
```

#### Format

Uno de los siguientes valores:

```typescript
type Format = 'standard' | 'dashOnly' | 'noSymbols'

// 'standard' = 11.222.333-4
// 'dashOnly' = 11222333-4
// 'noSymbols' = 112223334
```
