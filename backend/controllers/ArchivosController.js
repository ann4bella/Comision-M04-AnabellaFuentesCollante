const ArchivosController = {};

const rutaPrincipal = __dirname + '/../../tmp/';

ArchivosController.subirArchivo = (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    const archivo = req.files.miArchivo;

    if (archivo.size > 1024 * 1024) {
      return res.status(400).json({ error: 'El archivo es demasiado grande (máximo 1 MB)' });
    }

    const rutaGuardar = rutaPrincipal + archivo.name;

    return archivo.mv(rutaGuardar, function (err) {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        return res.json({ mensaje: 'El archivo se subió correctamente' });
      }
    });
  } catch (err) {
    console.error('Error al subir el archivo:', err);
    return res.status(500).json({ error: 'Ocurrió un error al intentar subir el archivo' });
  }
};

module.exports = ArchivosController;

