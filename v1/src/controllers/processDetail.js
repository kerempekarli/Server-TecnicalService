const ProcessDetailService = require("../services/processDetail");

class ProcessDetailController {
  async getAllProcessDetails(req, res) {
    try {
      const processDetails = await ProcessDetailService.getAllProcessDetails();
      res.json(processDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProcessDetailById(req, res) {
    const { id } = req.params;
    try {
      const processDetail = await ProcessDetailService.getProcessDetailById(id);
      if (!processDetail) {
        return res.status(404).json({ message: "ProcessDetail not found" });
      }
      res.json(processDetail);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProcessDetail(req, res) {
    const processDetailData = req.body;
    try {
      const newProcessDetail = await ProcessDetailService.createProcessDetail(
        processDetailData
      );
      res.json(newProcessDetail);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProcessDetail(req, res) {
    const { id } = req.params;
    const processDetailData = req.body;
    try {
      const updatedProcessDetail =
        await ProcessDetailService.updateProcessDetailById(
          id,
          processDetailData
        );
      res.json(updatedProcessDetail);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProcessDetail(req, res) {
    const { id } = req.params;
    try {
      const result = await ProcessDetailService.deleteProcessDetailById(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProcessDetailController();
