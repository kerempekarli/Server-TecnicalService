const ProcessService = require("../services/process");

class ProcessController {
  async getAllProcesses(req, res) {
    try {
      const processes = await ProcessService.getAllProcesses();
      res.json(processes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProcessById(req, res) {
    const { id } = req.params;
    try {
      const process = await ProcessService.getProcessById(id);
      if (!process) {
        return res.status(404).json({ message: "Process not found" });
      }
      res.json(process);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProcess(req, res) {
    console.log("ÇALIŞTI");
    const processData = req.body;
    try {
      const newProcess = await ProcessService.createProcessWithDetails(
        processData
      );
      res.json(newProcess);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProcess(req, res) {
    const { id } = req.params;
    const processData = req.body;
    try {
      const updatedProcess = await ProcessService.updateProcess(
        id,
        processData
      );
      res.json(updatedProcess);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProcess(req, res) {
    const { id } = req.params;
    try {
      const result = await ProcessService.deleteProcessById(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProcessController();
